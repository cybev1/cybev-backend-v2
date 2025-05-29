require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const postRoutes = require('./routes/post.routes');
const domainRoutes = require('./routes/domain.routes');
const userBlogsRoutes = require('./routes/userblogs.routes');
const commentRoutes = require('./routes/comment.routes');
const stakeRoutes = require('./routes/stake.routes');
const leaderboardRoutes = require('./routes/leaderboard.routes');
const authRoutes = require('./routes/auth.routes');
const loginRoutes = require('./routes/login.routes');
const meRoutes = require('./routes/me.routes');
const mintRoutes = require('./routes/mint.routes');
const tierBadgeRoutes = require('./routes/tierbadge.routes');
const tierHistoryRoutes = require('./routes/tierhistory.routes');
const aiRoutes = require('./routes/ai.routes'); // ✅ AI Generator Route

const app = express();

// ✅ CORS Configuration
app.use(cors({
  origin: 'https://app.cybev.io',
  credentials: true
}));

app.use(express.json());

// ✅ Route Registration
app.use('/api/auth', authRoutes);
app.use('/api', loginRoutes);             // /auth/login
app.use('/api', meRoutes);                // /auth/me
app.use('/api', mintRoutes);              // /posts/:id/mint
app.use('/api', tierBadgeRoutes);         // /tier/mint-badge
app.use('/api', tierHistoryRoutes);       // /tier/history
app.use('/api', aiRoutes);                // ✅ /ai/generate-post
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
    app.listen(process.env.PORT || 5000, () => console.log('Server running'));
  })
  .catch(err => console.error(err));
