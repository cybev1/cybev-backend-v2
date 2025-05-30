require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ Middleware
app.use(cors({
  origin: 'https://app.cybev.io',
  credentials: true
}));
app.use(express.json());

// ✅ Route Imports
const authRoutes = require('./routes/auth.routes');         // Register/Login
const onboardingRoutes = require('./routes/onboarding.routes'); // Onboarding
const meRoutes = require('./routes/me.routes');             // Get logged-in user
const loginRoutes = require('./routes/login.routes');       // Legacy
const postRoutes = require('./routes/post.routes');
const domainRoutes = require('./routes/domain.routes');
const userBlogsRoutes = require('./routes/userblogs.routes');
const commentRoutes = require('./routes/comment.routes');
const stakeRoutes = require('./routes/stake.routes');
const leaderboardRoutes = require('./routes/leaderboard.routes');
const mintRoutes = require('./routes/mint.routes');
const tierBadgeRoutes = require('./routes/tierbadge.routes');
const tierHistoryRoutes = require('./routes/tierhistory.routes');
const aiRoutes = require('./routes/ai.routes');             // AI content generation
const adsRoutes = require('./routes/ads.routes');           // Ads Manager
const nftRoutes = require('./routes/nft.routes');           // NFT Minting
const walletRoutes = require('./routes/wallet.routes');     // Wallet Manager
const utilityRoutes = require('./routes/utility.routes');   // Utility Services
const cmsRoutes = require('./routes/cms.routes');           // ✅ Community Management

// ✅ Route Bindings
app.use('/api/auth', authRoutes);
app.use('/api', onboardingRoutes);
app.use('/api', meRoutes);
app.use('/api', loginRoutes);
app.use('/api', mintRoutes);
app.use('/api', tierBadgeRoutes);
app.use('/api', tierHistoryRoutes);
app.use('/api', aiRoutes);
app.use('/api/posts', postRoutes);
app.use('/api', userBlogsRoutes);
app.use('/api', commentRoutes);
app.use('/api', stakeRoutes);
app.use('/api', leaderboardRoutes);
app.use('/api', domainRoutes);
app.use('/api/ads', adsRoutes);
app.use('/api/nft', nftRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/utility', utilityRoutes);
app.use('/api/cms', cmsRoutes); // ✅ CMS route

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running');
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
