
const express = require('express');
const router = express.Router();
const { verifyEmail } = require('../controllers/verify.controller');

router.get('/verify-email', verifyEmail);

module.exports = router;
