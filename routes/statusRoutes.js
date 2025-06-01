const express = require("express");
const router = express.Router();

const { createStatus, getFeed } = require("../controllers/statusController");

router.get("/test", (req, res) => {
  res.json({ message: "Status API is working ✅" });
});

router.post("/create", createStatus);
router.post("/feed", getFeed);

module.exports = router;
