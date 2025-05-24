const Blog = require('../models/blog.model');

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!blog) return res.status(404).json({ message: 'Blog not found or unauthorized' });
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};