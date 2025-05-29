const Post = require('../models/post.model');

// Create new post with extended options
exports.createPost = async (req, res) => {
  try {
    const { title, content, seo, category, niche, tags, status, schedule, boost, pin, mint, share } = req.body;
    const userId = req.user?.id;

    const newPost = new Post({
      title,
      content,
      seo,
      category,
      niche,
      tags: tags.split(',').map(tag => tag.trim()),
      status,
      schedule,
      boost,
      pin,
      isMinted: mint,
      userId,
      sharedToTimeline: share
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    console.error('❌ Failed to create post:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};