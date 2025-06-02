
const express = require('express');
const router = express.Router();
const { getUtilitySummary } = require('../controllers/utilitySummary.controller');

// @route GET /api/reports/utility-summary
router.get('/', getUtilitySummary);

module.exports = router;
