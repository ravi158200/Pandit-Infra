import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import verifyAdmin from '../middleware/auth.middleware.js';
import { sendUserCredentialsEmail } from '../utils/emailService.js';
import { sendUserCredentialsSMS } from '../utils/smsService.js';

const router = express.Router();

// Admin / User Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({
      $or: [{ username: username }, { email: username }]
    });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userRole = user.role || 'admin';
    const isBlocked = user.isBlocked || false;

    if (isBlocked) {
      return res.status(403).json({ message: 'Your account has been blocked by the administrator.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: userRole },
      process.env.JWT_SECRET || 'pandit_infra_secret_token_key_987654321',
      { expiresIn: '1d' } // 1 day expiration
    );

    res.json({ 
      token, 
      user: { id: user._id, username: user.username, role: userRole, isBlocked: isBlocked } 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login', error: err.message });
  }
});

// Check Auth Status
router.get('/me', verifyAdmin, async (req, res) => {
  try {
    // req.user is now the fully populated DB user object from verifyAdmin
    const userRole = req.user.role || 'admin';
    const isBlocked = req.user.isBlocked || false;
    res.json({
      _id: req.user._id,
      username: req.user.username,
      role: userRole,
      isBlocked: isBlocked,
      createdAt: req.user.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error retrieving current session' });
  }
});

// GET all users (Admin only)
router.get('/users', verifyAdmin, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admin permissions required' });
  }
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// POST create user (Admin only)
router.post('/users', verifyAdmin, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admin permissions required' });
  }
  const { username, password, email, phone, role } = req.body;
  if (!username || !password || !email || !phone || !role) {
    return res.status(400).json({ message: 'All fields are required (username, password, email, phone, role)' });
  }
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username, Email, or Phone already exists' });
    }
    const newUser = new User({ username, password, email, phone, role });
    await newUser.save();

    // Trigger email service in the background
    sendUserCredentialsEmail(email, username, password).catch(err => {
      console.error('Failed to send welcome email to', email, err);
    });

    // Trigger SMS service in the background
    sendUserCredentialsSMS(phone, username, password).catch(err => {
      console.error('Failed to send credentials SMS to', phone, err);
    });

    res.status(201).json({
      message: 'User created successfully',
      user: { _id: newUser._id, username: newUser.username, email: newUser.email, phone: newUser.phone, role: newUser.role, isBlocked: newUser.isBlocked }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

// PUT toggle user block status (Admin only)
router.put('/users/:id/toggle-block', verifyAdmin, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admin permissions required' });
  }
  try {
    const userToToggle = await User.findById(req.params.id);
    if (!userToToggle) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (userToToggle._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot block yourself' });
    }
    userToToggle.isBlocked = !userToToggle.isBlocked;
    await userToToggle.save();
    res.json({
      message: `User status changed to ${userToToggle.isBlocked ? 'Blocked' : 'Active'}`,
      user: { _id: userToToggle._id, username: userToToggle.username, role: userToToggle.role, isBlocked: userToToggle.isBlocked }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user block status', error: err.message });
  }
});

// DELETE user (Admin only)
router.delete('/users/:id', verifyAdmin, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admin permissions required' });
  }
  try {
    const userToDelete = await User.findById(req.params.id);
    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (userToDelete._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot delete yourself' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
});

export default router;
