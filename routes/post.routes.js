const express = require('express');
const { createPost, getUserPosts, getPublicPosts, getPostById } = require('../controllers/post.controller');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/create', auth, createPost);
router.get('/user', auth, getUserPosts);
router.get('/', getPublicPosts);
router.get('/:id', getPostById);

module.exports = router;
