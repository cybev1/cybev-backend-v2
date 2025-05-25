const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password, ref } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ message: 'Email or username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    let referrerId = null;

    if (ref) {
      const refUser = await User.findOne({ username: ref });
      if (refUser) referrerId = refUser._id;
    }

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      referrer: referrerId
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || 'cybev', { expiresIn: '7d' });

    res.status(201).json({ token, user: { username: newUser.username, email: newUser.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};