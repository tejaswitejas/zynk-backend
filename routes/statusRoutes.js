const express = require("express");
const router = express.Router();

const { createStatus, getFeed } = require("../controllers/statusController");

router.post("/create", createStatus);
router.post("/feed", getFeed);

module.exports = router;
