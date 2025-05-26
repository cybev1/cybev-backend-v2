const express = require('express');
const { deleteBlog } = require('../controllers/blog.controller');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

// ✅ Only the owner should delete a blog
router.delete('/blogs/:id', auth, deleteBlog);

module.exports = router;
