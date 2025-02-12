const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure nodemailer for email sending
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// Endpoint to send verification email
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ username, email, password: hashedPassword, isVerified: false });
    await user.save();

    // Generate verification token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const verificationLink = `http://localhost:3000/verify-email/${token}`;

    // Send email
    await transporter.sendMail({
      to: email,
      subject: "Email Verification",
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });

    res.json({ message: "Signup successful! Check your email to verify your account." });
  } catch (err) {
    res.status(400).json({ error: "User already exists!" });
  }
});

// Endpoint to verify email
router.get("/verify-email/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(decoded.userId, { isVerified: true });
    res.json({ message: "Email verified successfully!" });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
});

// Endpoint to request password reset
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

  const resetLink = `http://localhost:3000/reset-password/${token}`;
  await transporter.sendMail({
    to: email,
    subject: "Password Reset Request",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });

  res.json({ message: "Password reset email sent!" });
});

// Endpoint to reset password
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(decoded.userId, { password: hashedPassword });
    res.json({ message: "Password reset successfully!" });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
});

module.exports = router;
