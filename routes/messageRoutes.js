const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// GET API to retrieve all messages
router.get("/", async (req, res) => {
  try {
    // Retrieve all messages, sorted by createdAt in descending order
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ message: "Messages retrieved successfully", messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
