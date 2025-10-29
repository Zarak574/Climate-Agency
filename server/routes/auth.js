const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
const { sendResetEmail } = require('../utils/email')
const { authenticate } = require('../middleware/authMiddleware');

dotenv.config();


// GET all users (Admin only)
router.get('/all-users', authenticate, async (req, res) => {
  try {
    const users = await User.find({}, '-password'); 
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});



// Register
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'Registered', user: { email, role } });
    // res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err); // Log to terminal
    res.status(500).json({ message: 'Server error during registration' });
  }
});


// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found.' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

  const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});


// Request password reset
router.post('/reset-request', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'No user with that email' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const resetLink = `http://localhost:3000/reset-password/${token}`;
  await sendResetEmail(email, resetLink);

  res.json({ message: 'Reset email sent' });
});

// Reset password
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const hashed = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashed });

    res.json({ message: 'Password updated' });
  } catch {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});


module.exports = router;
