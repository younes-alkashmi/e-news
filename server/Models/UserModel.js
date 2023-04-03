import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    notifyCount: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    isEditor: {
      type: Boolean,
      default: false,
    },
    workField: {
      type: String,
      default: "",
    },
    startDate: {
      type: String,
      default: "",
    },
    document: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "active"],
      default: "pending",
    },
    confirmationCode: {
      type: String,
      unique: true,
    },
    shares: [],
    following: [],
    followers: [],
    notifications: [],
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema);

export default User;
