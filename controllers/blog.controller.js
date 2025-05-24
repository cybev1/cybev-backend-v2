
const Blog = require('../models/blog.model');

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      userId: req.userId
    });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBlogBySubdomain = async (req, res) => {
  try {
    const blog = await Blog.findOne({ domainValue: req.params.subdomain });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
