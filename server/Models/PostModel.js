import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: { type: String, default: "" },
    image: { type: String, default: "" },
    sharedBy: { type: String, default: "" },
    likes: [],
    comments: [
      {
        comment: { type: String, default: "" },
        userId: { type: String, default: "" },
        postId: { type: String, default: "" },
        createdAt: Date,
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
