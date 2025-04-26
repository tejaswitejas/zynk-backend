const Status = require("../models/Status.cjs");

exports.createStatus = async (req, res) => {
  try {
    const { content, mediaUrl, visibility } = Status.body;

    const status = new Status({
      user: req.user.id,
      content,
      mediaUrl,
      visibility,
    });
    await status.save();
    res.status(200).json(status);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFeed = async (req, res) => {
  try {
    const statuses = await Status.find({
      $or: [{ visibility: { type: "public" } }, { user: req.user.id }],
    }).populate("user", "user profilePic");

    res.status(200).json(statuses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
