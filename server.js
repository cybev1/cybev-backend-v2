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
const authRoutes = require('./routes/auth.routes');         
const onboardingRoutes = require('./routes/onboarding.routes'); 
const meRoutes = require('./routes/me.routes');             
const loginRoutes = require('./routes/login.routes');       
const postRoutes = require('./routes/post.routes');
const domainRoutes = require('./routes/domain.routes');
const userBlogsRoutes = require('./routes/userblogs.routes');
const commentRoutes = require('./routes/comment.routes');
const stakeRoutes = require('./routes/stake.routes');
const leaderboardRoutes = require('./routes/leaderboard.routes');
const mintRoutes = require('./routes/mint.routes');
const tierBadgeRoutes = require('./routes/tierbadge.routes');
const tierHistoryRoutes = require('./routes/tierhistory.routes');
const aiRoutes = require('./routes/ai.routes');             
const adsRoutes = require('./routes/ads.routes');           
const nftRoutes = require('./routes/nft.routes');           
const walletRoutes = require('./routes/wallet.routes');     
const utilityRoutes = require('./routes/utility.routes');   
const cmsRoutes = require('./routes/cms.routes');           
const verifyRoutes = require('./routes/verify.routes');      // ✅ Email Verification

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
app.use('/api/cms', cmsRoutes);
app.use('/api', verifyRoutes); // ✅ Email verification endpoint

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running');
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
