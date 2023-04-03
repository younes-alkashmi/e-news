import mongoose from "mongoose";
import Post from "../Models/PostModel.js";
import User from "../Models/UserModel.js";

// create a post

export const createPost = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (user) {
      if (!user.isEditor)
        return res.status(403).json("Action forbidden for non editors");
    } else {
      return res.status(404).json("User not found!");
    }
    const post = new Post(req.body);
    post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sharePost = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  try {
    const user = await User.findById(_id);

    if (user.shares.includes(id)) {
      await user.updateOne({ $pull: { shares: id } });
      res.status(200).json("Post shared successfully.");
    } else {
      await user.updateOne({ $push: { shares: id } });
      res.status(200).json("post pulled from shares successfully.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get a post
export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a post

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await Post.findById(id);
    if (post.userId === userId) {
      const p = await Post.findByIdAndUpdate({ _id: post._id }, req.body, {
        new: true,
      });

      res.status(200).json(p);
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    await post.deleteOne();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await Post.findById(id);
    const user = await User.findById(mongoose.Types.ObjectId(userId));
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked");
    } else {
      //push notification into post's editor
      const followed = await User.findById(
        mongoose.Types.ObjectId(post.userId)
      );
      await followed.updateOne({
        $push: {
          notifications: {
            userId: user._id,
            message: `${user.username} قام بالإعجاب بمنشورك`,
            createdAt: Date.now(),
          },
        },
      });

      //update post likes array
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body.commentData;
  try {
    let post = await Post.findById(id);
    const user = await User.findById(mongoose.Types.ObjectId(userId));
    if (user) {
      await post.updateOne({
        $push: {
          comments: req.body.commentData,
        },
      });

      //push notification into post's editor
      const followed = await User.findById(
        mongoose.Types.ObjectId(post.userId)
      );
      await followed.updateOne({
        $push: {
          notifications: {
            userId: user._id,
            message: `${user.username} قام بإضافة تعليق على منشورك`,
            createdAt: Date.now(),
          },
        },
      });

      //get post after updating
      post = await Post.findById(id);
      res.status(200).json(post);
    } else {
      res.status(403).json("Action forbidden for non users.");
    }
  } catch (error) {
    res.status(500).json("comment couldn't be added something went wrong");
  }
};

// delete comment from specific post

export const deleteComment = async (req, res) => {
  const id = req.params.id;
  // const { userId } = req.body;
  try {
    const posts = await Post.find();
    let post;
    let comment;

    posts.map((p) => {
      p.comments.map((c) => {
        if (c._id.toString() === id) {
          post = p;
          comment = c;
        }
      });
    });

    await post.updateOne({
      $pull: {
        comments: {
          _id: id,
        },
      },
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json("comment couldn't be deleted something went wrong");
  }
};

export const getTrends = async (req, res) => {
  try {
    const posts = await Post.find();
    posts.sort((a, b) => b.likes - a.likes);

    const trends = [];
    for (let i = 0; i < posts.length && i < 20; i++) trends.push(posts[i]);

    res.status(200).json(trends);
  } catch {
    res.status(500).json("No trend posts.");
  }
};

// get timeline
export const getTimeLine = async (req, res) => {
  const userId = req.params.id;
  (await Post.find()).map((post) => (post.sharedBy = ""));
  try {
    const timeLine = await Post.find({ userId: userId });
    const user = await User.findById(mongoose.Types.ObjectId(userId));

    for (let i = 0; i < user.following.length; i++) {
      const followUser = await User.findById(user.following[i]);
      const posts = await Post.find({ userId: followUser._id });

      timeLine.push(...posts);
    }

    for (let i = 0; i < user.shares.length; i++) {
      const post = await Post.findById(mongoose.Types.ObjectId(user.shares[i]));
      post.sharedBy = `تم مشاركته بواسطة ${user.username}`;
      timeLine.push(post);
    }

    timeLine.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.status(200).json(timeLine);
  } catch (error) {
    res.status(500).json(error);
  }
};
