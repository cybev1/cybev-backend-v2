
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

    const msg = {
      to: email,
      from: 'noreply@cybev.io',
      subject: 'Verify Your CYBEV.IO Account',
      html: \`
        <h3>Welcome to CYBEV.IO</h3>
        <p>Please verify your email by clicking the link below:</p>
        <a href="https://app.cybev.io/verify-email?token=\${token}">Verify Email</a>
      \`,
    };

    await sgMail.send(msg);

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token: jwtToken, user: { id: user._id, email: user.email, isVerified: false } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};
