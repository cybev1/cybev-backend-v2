
const express = require("express");
const router = express.Router();
const onboardingController = require("../controllers/onboarding.controller");
const verifyToken = require("../middleware/auth.middleware"); // Ensure token check

router.post("/auth/onboarding", verifyToken, onboardingController.updateOnboarding);

module.exports = router;
