const express = require('express');
const { getBadgeHistory } = require('../controllers/tierhistory.controller');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/tier/history', auth, getBadgeHistory);

module.exports = router;