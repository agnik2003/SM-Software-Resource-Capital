const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Set up Email Transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // Expires in 10 minutes

    let user = await User.findOne({ email });

    if (user) {
      if (user.isVerified) {
        return res.status(400).json({ message: 'User already exists and is verified. Please log in.' });
      }
      // If user exists but isn't verified yet, update their OTP and password
      user.password = password;
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    } else {
      // Create brand new user
      user = new User({ name, email, password, otp, otpExpires });
      await user.save();
    }

    // Send the OTP via Email
    // Send the OTP via Email
    await transporter.sendMail({
      from: `"SM Software Capital" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Your Verification Code`,
      html: `
        <h2>Account Verification</h2>
        <p>Hello ${name},</p>
        <p>Your one-time password (OTP) to create your account is:</p>
        <h1 style="font-size: 40px; letter-spacing: 5px; color: #22c55e;">${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
      `,
    });

    res.status(200).json({ success: true, message: 'OTP sent to email.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'User not found.' });
    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP code.' });
    if (user.otpExpires < Date.now()) return res.status(400).json({ message: 'OTP has expired. Please sign up again.' });

    // Mark as verified and clear OTP
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Generate Login Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(200).json({ success: true, token, user: { id: user._id, name: user.name, email } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });
    if (!user.isVerified) return res.status(400).json({ message: 'Please verify your email first.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ success: true, token, user: { id: user._id, name: user.name, email } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password -otp -otpExpires');
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ success: true, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};