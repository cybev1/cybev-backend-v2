
const Post = require('../models/post.model');

exports.createPost = async (req, res) => {
  try {
    const { title, content, category, niche, tags, status, scheduledAt, isMinted, boost, pin, shareToTimeline } = req.body;
    const userId = req.user?.userId;

    if (!title || !content || !userId) return res.status(400).json({ message: 'Missing fields' });

    const post = await Post.create({
      title,
      content,
      category,
      niche,
      tags,
      status: status || 'published',
      scheduledAt,
      isMinted: isMinted || false,
      boosted: boost || false,
      pinned: pin || false,
      shareToTimeline: shareToTimeline || false,
      userId
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
