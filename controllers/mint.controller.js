const Post = require('../models/post.model');

exports.mintPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.isMinted) return res.status(400).json({ message: 'Post already minted' });

    post.isMinted = true;
    await post.save();

    res.status(200).json({ message: 'Post minted successfully', post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};