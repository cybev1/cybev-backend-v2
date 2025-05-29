
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String },
  niche: { type: String },
  tag: { type: String },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  featuredImage: { type: String },
  videoUrl: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  isMinted: { type: Boolean, default: false },
  isBoosted: { type: Boolean, default: false },
  isPinned: { type: Boolean, default: false },
  isShared: { type: Boolean, default: false },
  isDraft: { type: Boolean, default: false },
  scheduledAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
