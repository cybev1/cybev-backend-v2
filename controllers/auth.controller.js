
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.register = async (req, res) => {
  const { name, email, password, username, referralCode } = req.body;

  try {
    if (!name || !email || !password || !username) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username is already taken.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      username,
      email,
      passwordHash,
      referralCode,
      emailToken: token,
      isVerified: false
    });

    console.log(`Verify link: https://app.cybev.io/verify-email?token=${token}`);

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token: jwtToken, user: { id: user._id, email: user.email, isVerified: false } });
  } catch (err) {
    console.error('❌ Registration failed:', err);
    res.status(500).json({ message: 'Something went wrong on the server.' });
  }
};
