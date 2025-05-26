const express = require('express');
const { getMe } = require('../controllers/me.controller');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/auth/me', auth, getMe);

module.exports = router;