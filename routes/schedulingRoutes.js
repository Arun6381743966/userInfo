const express = require("express");
const router = express.Router();
const schedule = require("node-schedule");
const Message = require("../models/Message");

router.post("/schedule", async (req, res) => {
  try {
    const { message, day, time } = req.body;
    if (!message || !day || !time) {
      return res.status(400).json({ error: "Please provide message, day, and time." });
    }

    const scheduledTime = new Date(`${day}T${time}:00`);

    // Check if the scheduled time is in the future
    if (scheduledTime <= new Date()) {
      return res.status(400).json({ error: "Scheduled time must be in the future." });
    }

    // Schedule the job using node-schedule
    schedule.scheduleJob(scheduledTime, async function () {
      try {
        await Message.create({ message });
        console.log(" Message inserted at scheduled time:", message);
      } catch (err) {
        console.error(" Error inserting scheduled message:", err);
      }
    });

    res.json({ message: `Message scheduled for insertion at ${scheduledTime}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
