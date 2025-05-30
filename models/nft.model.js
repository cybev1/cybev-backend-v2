
const mongoose = require('mongoose');

const NFTSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  tokenId: { type: String, required: true },
  txHash: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('NFT', NFTSchema);
