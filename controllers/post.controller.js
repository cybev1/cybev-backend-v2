const Post = require('../models/post.model');

exports.createPost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      title, content, category, niche, tags,
      image, video, status, scheduledDate,
      isPinned, isBoosted, shareToTimeline
    } = req.body;

    const post = new Post({
      title,
      content,
      category,
      niche,
      tags,
      image,
      video,
      status,
      scheduledDate,
      isPinned,
      isBoosted,
      shareToTimeline,
      userId
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};