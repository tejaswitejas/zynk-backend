const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: string, required: true, unique: true },
    email: { type: string, required: true, unique: true },
    password: { type: string, required: true },
    profilePic: { type: strng, default: "" },
    status: { type: String, default: "Hey there! I’m using Messenger." },
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
