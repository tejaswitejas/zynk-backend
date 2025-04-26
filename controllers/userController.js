const User = require("../models/User.cjs");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, profilePic, bio } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, bio, profilePic },
      { new: true }
    ).select("-password");
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};

exports.followUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user.id;

    if ((targetUserId = currentUserId)) {
      res.status(400).json({ message: "You can't follow yourself" });
    }

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser.followers.includes(currentUser)) {
      targetUser.followers.push(currentUserId);
      currentUser.following.push(targetUserId);

      await targetUser.save();
      await currentUser.save();

      return res.status(200).json({ message: "Followed successfully" });
    } else {
      return res.status(400).json({ message: "Already following!" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.unFollowUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user.id;

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (targetUser.followers.includes(currentUser)) {
      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== currentUserId
      );
      currentUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== targetUserId
      );

      await targetUser.save();
      await currentUser.save();

      res.status(200).json({ message: "Unfollowed succesfully" });
    } else {
      return res.json(400).json({ message: "You are not following this user" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
