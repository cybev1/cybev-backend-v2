
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.register = async (req, res) => {
  const { name, email, password, username, referralCode } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

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

    const verifyLink = `https://app.cybev.io/verify-email?token=${token}`;

    await resend.emails.send({
      from: 'CYBEV.IO <onboarding@resend.dev>',
      to: email,
      subject: 'Verify Your Email – CYBEV.IO',
      html: `
        <h2>Welcome to CYBEV.IO</h2>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verifyLink}" style="padding: 10px 20px; background: #3b82f6; color: white; text-decoration: none; border-radius: 4px;">Verify Email</a>
        <p>If you did not request this, you can ignore this email.</p>
      `
    });

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token: jwtToken, user: { id: user._id, email: user.email, isVerified: false } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};
