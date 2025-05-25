const Blog = require('../models/blog.model');

exports.getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};