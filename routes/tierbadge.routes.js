const express = require('express');
const { mintBadge } = require('../controllers/tierbadge.controller');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/tier/mint-badge', auth, mintBadge);

module.exports = router;