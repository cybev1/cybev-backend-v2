
const Post = require('../models/post.model');

// Create post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({ ...req.body, userId: req.user.userId });
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user's posts
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user.userId });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mint
exports.mintPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { isMinted: true }, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Boost
exports.boostPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { isBoosted: true }, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Pin
exports.pinPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { isPinned: true }, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Schedule
exports.schedulePost = async (req, res) => {
  try {
    const { date } = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, {
      isScheduled: true,
      scheduledDate: new Date(date)
    }, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Share
exports.sharePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { sharedToTimeline: true }, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
