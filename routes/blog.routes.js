
const express = require('express');
const { createBlog, getBlogBySubdomain } = require('../controllers/blog.controller');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/blogs/create', auth, createBlog);
router.get('/blogs/:subdomain', getBlogBySubdomain);

module.exports = router;
