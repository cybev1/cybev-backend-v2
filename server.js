require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.routes');   // Already there ✅
const postRoutes = require('./routes/post.routes');   // ✅ NEW

const app = express();

app.use(express.json());

// ✅ Route Registration
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); // ✅ This enables /api/posts/create

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => console.log('Server running'));
  })
  .catch(err => console.error(err));
