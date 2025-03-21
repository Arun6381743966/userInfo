const express = require("express");
const { uploadFile } = require("../controllers/uploadController.js");
const router = express.Router();

router.post("/", uploadFile);

module.exports = router;
