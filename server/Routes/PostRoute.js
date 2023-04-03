import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getTimeLine,
  likePost,
  updatePost,
  addComment,
  deleteComment,
  getTrends,
  sharePost,
} from "../Controllers/PostController.js";

const router = express.Router();

router.post("/", createPost);
router.get("/:id", getPost);
router.get("/:id/trends", getTrends);
router.put("/:id/share", sharePost);
router.put("/:id/update", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.put("/:id/comment", addComment);
router.delete("/:id/comment", deleteComment);
router.get("/:id/timeline", getTimeLine);
export default router;
