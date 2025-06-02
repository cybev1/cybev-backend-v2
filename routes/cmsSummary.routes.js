
const express = require('express');
const router = express.Router();
const { getCMSSummary } = require('../controllers/cmsSummary.controller');

router.get('/', getCMSSummary);

module.exports = router;
