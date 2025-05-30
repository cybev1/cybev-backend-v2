
const express = require("express");
const router = express.Router();
const meController = require("../controllers/me.controller");
const verifyToken = require("../middleware/auth.middleware");

router.get("/me", verifyToken, meController.getMe);

module.exports = router;
