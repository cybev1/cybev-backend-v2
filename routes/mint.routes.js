const express = require('express');
const { mintPost } = require('../controllers/mint.controller');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/posts/:id/mint', auth, mintPost);

module.exports = router;