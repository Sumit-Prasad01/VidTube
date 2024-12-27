import mongoose from "mongoose";
import { Comment } from "../models/comment.models.js";
import { Video } from "../models/video.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  const options = {
    page,
    limit,
  };
  const comments = await Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "createdBy",
        pipeline: [
          {
            $project: {
              username: 1,
              fullName: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        createdBy: {
          $first: "$createdBy",
        },
      },
    },
    {
      $unwind: "$createdBy",
    },
    {
      $project: {
        content: 1,
        createdBy: 1,
      },
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: parseInt(limit),
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments Fetched"));
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { videoId } = req.params;
  const { content } = req.body;
  const user = req.user._id;
  if (!content) {
    throw new ApiError(400, "Comment content is missing");
  }
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  const comment = await Comment.create({
    content,
    video: videoId,
    owner: user,
  });
  if (!comment) {
    throw new ApiError(500, "Error while saving the comment");
  }

  return response
    .status(200)
    .json(new ApiResponse(200, comment, "Comment Saved"));
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { content } = req.body;
  if (!content) {
    throw new ApiError(400, "Comment content is required");
  }
  const { commentId } = req.params;
  const user = req.user._id;
  const originalComment = await Comment.findById(commentId);
  if (!originalComment) {
    throw new ApiError(404, "Comment not found");
  }
  if (originalComment.owner !== user) {
    throw new ApiError(403, "You don't have permission to update this comment");
  }

  const updateComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content,
      },
    },
    { new: true }
  );

  if (!updateComment) {
    throw new ApiError(500, "Error while updating comment");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateComment, "Comment updated"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.params;
  const user = req.user._id;
  const comment = await Comment(findById(commentId));
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }
  if (comment.owner !== user) {
    throw new ApiError(404, "You don't have permission to delete this comment");
  }

  const deleteComment = await Comment.findByIdAndDelete(commentId);
  if (!deleteComment) {
    throw new ApiError(500, "Error while deleting comment");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deleteComment, "Comment deleted"));
});

export { getVideoComments, addComment, updateComment, deleteComment };