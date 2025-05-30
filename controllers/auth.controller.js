
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.register = async (req, res) => {
  const { name, username, email, password, referralCode } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      username,
      email,
      passwordHash: hashedPassword,
      referralCode,
      features: {
        hasBlog: true,
        hasTimeline: true,
        hasNFT: true,
        hasUtilityAccess: true
      }
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "7d" });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "7d" });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
