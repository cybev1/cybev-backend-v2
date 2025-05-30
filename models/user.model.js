
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  passwordHash: String,
  isVerified: { type: Boolean, default: false },
  emailToken: String,
  walletAddress: String,
  referredBy: String,
  referralCode: String,
  profileImage: String,
  bio: String,
  interests: [String],
  features: {
    hasBlog: { type: Boolean, default: true },
    hasTimeline: { type: Boolean, default: true },
    hasNFT: { type: Boolean, default: true },
    isCMSAdmin: { type: Boolean, default: false },
    isSuperBlogger: { type: Boolean, default: false },
    hasUtilityAccess: { type: Boolean, default: true },
    canUseAI: { type: Boolean, default: false }
  }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
