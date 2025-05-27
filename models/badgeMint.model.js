const mongoose = require('mongoose');

const badgeMintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tier: { type: String, required: true },
  mintedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BadgeMint', badgeMintSchema);