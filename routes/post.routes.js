
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const Post = require('../models/post.model');

// Create Post
router.post('/create', auth, async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, userId: req.userId });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get User Posts
router.get('/user', auth, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Boost a Post
router.post('/:id/boost', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { isBoosted: true },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Pin a Post
router.post('/:id/pin', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { isPinned: true },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Schedule a Post
router.post('/:id/schedule', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { scheduledAt: new Date(req.body.scheduledAt) },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Share to Social Media
router.post('/:id/share', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { isShared: true },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
