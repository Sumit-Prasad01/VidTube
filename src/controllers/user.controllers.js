import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  if (
    [fullname, email, username, password].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    throw new ApiError(409, "User with this email or username already exists.");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverLocalPath = req.files?.CoverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  let avatar = "";
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log("Uplaoded avatar", avatar);
    
  } catch (error) {
    throw new ApiError(500, "Failed to upload avatar.");
  }

  let coverImage = "";
  try {
    coverImage = await uploadOnCloudinary(coverLocalPath);
    console.log("Uplaoded cover image", coverImage);
    
  } catch (error) {
    throw new ApiError(500, "Failed to upload coverImage.");
  }

  try {
    const user = await User.create({
      fullname,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase(),
    });
  
    const createdUser = await User.findbyId(User._id).select(
      "-password -refreshToken"
    );
  
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering a user.");
    }
  
    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered successfully."));
  } catch (error) {
    console.log("user creation failed");

    if(avatar){
      await deleteFromCloudinary(avatar.publicId)
    }
    if(coverImage){
      await deleteFromCloudinary(coverImage.publicId)
    }
    throw new ApiError(500, "Something went wrong while registering the user, and images were deleted.")
    
  }
});

export { registerUser };
