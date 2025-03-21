const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Agent = require("../models/Agent");
const Account = require("../models/Account");
const Policy = require("../models/Policy");
const Carrier = require("../models/PolicyCarrier");
const Category = require("../models/PolicyCategory");
const Message = require("../models/Message");

router.delete("/delete-all", async (req, res) => {
  try {
    await User.deleteMany({});
    await Agent.deleteMany({});
    await Account.deleteMany({});
    await Policy.deleteMany({});
    await Carrier.deleteMany({});
    await Category.deleteMany({});
    await Message.deleteMany({});

    res.json({ message: " All uploaded data has been deleted successfully" });
  } catch (err) {
    console.error(" Error deleting data:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
