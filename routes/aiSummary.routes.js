
const express = require('express');
const router = express.Router();
const { generateAISummary } = require('../controllers/aiSummary.controller');

// GET /api/reports/ai-summary
router.get('/', generateAISummary);

module.exports = router;
