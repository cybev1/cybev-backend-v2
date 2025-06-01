
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');

// @route   GET /api/reports/generate
// @desc    Generate and email token metrics report manually
router.get('/generate', reportController.generateTokenReport);

module.exports = router;
