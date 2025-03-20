const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Agent = require("../models/Agent");
const Account = require("../models/Account");
const Policy = require("../models/Policy");
const Carrier = require("../models/PolicyCarrier");
const Category = require("../models/PolicyCategory");
const Message = require("../models/Message");

// 🚀 Delete all uploaded data
router.delete("/delete-all", async (req, res) => {
  try {
    await User.deleteMany({});
    await Agent.deleteMany({});
    await Account.deleteMany({});
    await Policy.deleteMany({});
    await Carrier.deleteMany({});
    await Category.deleteMany({});
    await Message.deleteMany({});

    res.json({ message: "✅ All uploaded data has been deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting data:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// 🚀 Get all users' first names
// router.get("/users/first-names", async (req, res) => {
//   try {
//     // 🔍 Fetch only first names from all users
//     const users = await User.find({}, "firstname");

//     if (!users.length) {
//       return res.status(404).json({ message: "❌ No users found" });
//     }

//     // Extract first names from users list
//     const firstNames = users.map((user) => user.firstname);

//     res.json({ message: "✅ First names fetched successfully", firstNames });
//   } catch (err) {
//     console.error("❌ Error fetching first names:", err.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// 🚀 Search API - Find user by full name (First + Last Name)
// router.get("/users/search/:fullName", async (req, res) => {
//   try {
//     const fullName = req.params.fullName.trim();

//     // 🔍 Split the full name into firstName and lastName
//     const nameParts = fullName;
//     const firstName = nameParts;
//     // Supports multi-word last names

//     // 🔍 Find user with exact first + last name match (case-insensitive)
//     const user = await User.findOne({
//       firstname: new RegExp(`^${firstName}$`, "i"),
//     });

//     if (!user) {
//       return res.status(404).json({ message: "❌ User not found" });
//     }

//     res.json({ message: "✅ User found", user });
//   } catch (err) {
//     console.error("❌ Error searching user:", err.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

module.exports = router;
