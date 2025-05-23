const Post = require('../models/post.model');

exports.createPost = async (req, res) => {
  const { title, category, content } = req.body;
  try {
    const post = await Post.create({
      title,
      category,
      content,
      userId: req.userId // Automatically from auth middleware
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
