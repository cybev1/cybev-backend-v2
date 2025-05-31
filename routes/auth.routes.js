
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Only use the working route for now
router.post("/register", authController.register);

// Commented out temporarily to prevent server crash
// router.post("/login", authController.login);

module.exports = router;
