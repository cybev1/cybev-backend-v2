const express = require('express');
const { getUserBlogs } = require('../controllers/blog.controller');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

// ✅ Protect user-specific blog fetch
router.get('/blogs/user', auth, getUserBlogs);

module.exports = router;
