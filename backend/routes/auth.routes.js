const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth.middleware');
const {
  register,
  login,
  getMe,
  updatePassword
} = require('../controllers/auth.controller');

// Public routes
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/password', protect, updatePassword);

// Admin only routes
router.post('/register', protect, adminOnly, register);

module.exports = router;
