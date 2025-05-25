const express = require('express');
const { createStake, getUserStakes } = require('../controllers/stake.controller');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/stakes', auth, createStake);
router.get('/stakes/user', auth, getUserStakes);

module.exports = router;