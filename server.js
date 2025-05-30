require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ Middleware
app.use(cors({
  origin: 'https://app.cybev.io', // frontend domain
  credentials: true
}));
app.use(express.json());

// ✅ Route Imports
const authRoutes = require('./routes/auth.routes'); // Register/Login
const onboardingRoutes = require('./routes/onboarding.routes'); // Onboarding
const meRoutes = require('./routes/me.routes'); // 🔍 Get logged-in user
const loginRoutes = require('./routes/login.routes'); // Legacy
const postRoutes = require('./routes/post.routes');
const domainRoutes = require('./routes/domain.routes');
const userBlogsRoutes = require('./routes/userblogs.routes');
const commentRoutes = require('./routes/comment.routes');
const stakeRoutes = require('./routes/stake.routes');
const leaderboardRoutes = require('./routes/leaderboard.routes');
const mintRoutes = require('./routes/mint.routes');
const tierBadgeRoutes = require('./routes/tierbadge.routes');
const tierHistoryRoutes = require('./routes/tierhistory.routes');
const aiRoutes = require('./routes/ai.routes'); // AI content generation

// ✅ Route Bindings
app.use('/api/auth', authRoutes);             // Registration/Login
app.use('/api', onboardingRoutes);            // Onboarding setup
app.use('/api', meRoutes);                    // ✅ User dashboard profile
app.use('/api', loginRoutes);                 // Legacy auth
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

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running');
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
