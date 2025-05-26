require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const postRoutes = require('./routes/post.routes');
const domainRoutes = require('./routes/domain.routes');
const userBlogsRoutes = require('./routes/userblogs.routes');
const commentRoutes = require('./routes/comment.routes');
const stakeRoutes = require('./routes/stake.routes');
const leaderboardRoutes = require('./routes/leaderboard.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(express.json());

// ✅ Route Registration
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api', userBlogsRoutes);
app.use('/api', commentRoutes);
app.use('/api', stakeRoutes);
app.use('/api', leaderboardRoutes);
app.use('/api', domainRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => console.log('Server running'));
  })
  .catch(err => console.error(err));
