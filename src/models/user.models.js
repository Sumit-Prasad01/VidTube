import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      reqiured: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      reqiured: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      reqiured: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url
      reqiured: true,
    },
    coverImage: {
      type: String, //cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    refeshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
