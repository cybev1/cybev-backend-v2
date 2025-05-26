const express = require('express');
const router = express.Router();
const { createPost } = require('../controllers/post.controller');
const auth = require('../middleware/auth.middleware');

// ✅ Only logged-in users can create posts
router.post('/create', auth, createPost);

module.exports = router;
