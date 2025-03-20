const express = require("express");
const { uploadFile } = require("../controllers/uploadController.js");
const router = express.Router();

router.post("/", uploadFile); // ✅ Defines the POST /api/upload route

module.exports = router;
