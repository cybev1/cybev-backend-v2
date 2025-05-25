const express = require('express');
const { getTopStakers } = require('../controllers/leaderboard.controller');
const router = express.Router();

router.get('/stakes/leaderboard', getTopStakers);

module.exports = router;