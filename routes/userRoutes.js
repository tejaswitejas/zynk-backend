const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  followUser,
  unFollowUser,
} = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

router.post("/profile", auth, getProfile);
router.post("/profile/update", auth, updateProfile);
router.post("/follow/:id", auth, followUser);
router.post("/unfollow/:id", auth, unFollowUser);

module.exports = router;
