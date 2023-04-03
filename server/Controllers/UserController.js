import User from "../Models/UserModel.js";
import Admin from "../Models/AdminModel.js";
import Post from "../Models/PostModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { transporter } from "../Services/Nodemailer.js";

const approval_msg =
  "شكرا لإنضمامكم \nنعلمكم أنه تم قبول طلبكم ويمكنكم تسجيل الدخول والبدء في النشر";
const refusing_msg =
  "نأسف تم رفض طلبكم بالانضمام وتم حذف الحساب يرجى مراجعة المستند المرسل أو الاتصال بإدارة فريق E-NEWS";

const mailOptions = {
  from: process.env.MAIL_NAME,
  to: "",
  subject: "",
  text: "",
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    users.map((user) => {
      const { password, ...data } = user;
      return data;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById({ _id: id }).select("-password");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Editor approval
export const Approval = async (req, res) => {
  let { users } = req.body;
  try {
    users.map(async (email) => {
      const user = await User.findOne({ email });

      if (user.gender === "firm") {
        user.isEditor = true;
        user.save();
        mailOptions.to = email;
        mailOptions.subject = "Request Approval";
        mailOptions.text = approval_msg;

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return error;
          } else {
            console.log(`Email sent to ${email}`);
          }
        });
      }
    }); // users callback
    users = await User.find();
    users.map((user) => {
      const { password, ...data } = user;
      return data;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, password } = req.body;

  if (id === _id) {
    try {
      // if (password) {
      //   const salt = await bcrypt.genSalt(10);
      //   req.body.password = await bcrypt.hash(password, salt);
      // }
      const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
      });

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(403).json("Access denied, you can only update your own account");
  }
};

export const removeUsers = async (req, res) => {
  let { users } = req.body;

  try {
    users.map(async (user) => {
      const removed = await User.findOneAndDelete({ email: user });
      await Post.deleteMany({ userId: removed._id });
      if (removed.gender === "firm" && removed.isEditor) {
        mailOptions.to = removed.email;
        mailOptions.subject = "Request Refusing";
        mailOptions.text = refusing_msg;

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return error;
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }
    });

    users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { _id, username, password } = req.body;
  const admin = await Admin.findOne({ username });

  const valid =
    password && admin ? await bcrypt.compare(password, admin.password) : false;

  if (id === _id || valid) {
    try {
      const user = await User.findByIdAndDelete({ _id: id });
      await Post.deleteMany({ userId: user._id });

      user
        ? res.status(200).json(user.username + "has been deleted succefully.")
        : res.status(404).json("User not found!");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(403).json("Action denied, you can only delete your own account");
  }
};

export const follow = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (id !== _id) {
    try {
      const followed = await User.findById(id);
      const user = await User.findById(_id);

      if (!user.following.includes(followed._id)) {
        await user.updateOne({ $push: { following: followed._id } });
        await followed.updateOne({ $push: { followers: user._id } });
        await followed.updateOne({
          $push: {
            notifications: {
              userId: user._id,
              message: `${user.username} قام بمتابعتك`,
              createdAt: Date.now(),
            },
          },
        });
        res.status(200).json("User followed succefully");
      } else {
        res.status(403).json("User already followed by you.");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(403).json("Action forbidden");
  }
};

export const unfollow = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (id !== _id) {
    try {
      const followed = await User.findById(id);
      const user = await User.findById(_id);

      if (user.following.includes(followed._id)) {
        await user.updateOne({ $pull: { following: followed._id } });
        await followed.updateOne({ $pull: { followers: user._id } });
        res.status(200).json("User unfollowed succefully");
      } else {
        res.status(403).json("User already not followed by you.");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(403).json("Action forbidden");
  }
};

export const updateAdmin = async (req, res) => {
  const { username, usersCount } = req.body;
  try {
    const admin = await Admin.findOneAndUpdate(
      { username },
      { usersCount },
      { new: true }
    );

    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSuggestions = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById({ _id: id });
    let followedUsers;
    if (user) {
      followedUsers = await User.find({
        _id: {
          $in: user.following,
        },
      });
    } else {
      res.status(404).json("No such user exists");
    }
    const allUsers = await User.find();
    const suggestions = [];
    const follwedIds = followedUsers.map((user) => user.email);

    allUsers.map((value) => {
      if (
        !follwedIds.includes(value.email) &&
        user.email !== value.email &&
        value.isEditor
      )
        suggestions.push(value);
    });
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
