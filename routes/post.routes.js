
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const {
  createPost,
  getUserPosts,
  getPostById,
  updatePost,
  deletePost,
  mintPost,
  boostPost,
  pinPost,
  schedulePost,
  sharePost
} = require('../controllers/post.controller');

// Core Routes
router.post('/create', auth, createPost);
router.get('/user', auth, getUserPosts);
router.get('/:id', auth, getPostById);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

// Extra Functional Routes
router.post('/:id/mint', auth, mintPost);
router.post('/:id/boost', auth, boostPost);
router.post('/:id/pin', auth, pinPost);
router.post('/:id/schedule', auth, schedulePost);
router.post('/:id/share', auth, sharePost);

module.exports = router;
