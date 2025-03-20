const express = require("express");
const { searchUserPolicies, aggregateUserPolicies, getUserLit } = require("./../controllers/userController");
const router = express.Router();

router.get("/search/:name", searchUserPolicies);
router.get("/aggregate", aggregateUserPolicies);
router.get("/", getUserLit);

module.exports = router;
