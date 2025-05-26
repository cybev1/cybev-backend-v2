const express = require('express');
const { createBlog, getBlogBySubdomain } = require('../controllers/blog.controller');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

// ✅ Only logged-in users can create blogs
router.post('/blogs/create', auth, createBlog);

// 🔓 Public blog access by subdomain
router.get('/blogs/:subdomain', getBlogBySubdomain);

module.exports = router;
