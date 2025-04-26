const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    mediaUrl: { type: String }, // optional
    visibility: {
      type: {
        type: String,
        enum: ["public", "private", "custom", "hidden_from"],
        default: "public",
      },
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Status", StatusSchema);
