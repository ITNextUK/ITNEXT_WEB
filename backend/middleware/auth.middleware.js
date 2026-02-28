const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user || !req.user.isActive) {
        return res.status(401).json({
          status: 'error',
          message: 'User not found or inactive'
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid or expired token'
      });
    }
  } catch (error) {
    next(error);
  }
};

// Optional protect - sets req.user if valid token present, but allows unauthenticated access
const optionalProtect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
      } catch (error) {
        // Token invalid — continue as unauthenticated
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Admin only access
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      status: 'error',
      message: 'Admin access required'
    });
  }
};

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

module.exports = { protect, optionalProtect, adminOnly, generateToken };
