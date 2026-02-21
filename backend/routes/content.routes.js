const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth.middleware');
const {
  getContent,
  updateContent,
  updateSection,
  resetContent
} = require('../controllers/content.controller');

// Public routes
router.get('/', getContent);

// Protected routes
router.put('/', protect, updateContent);
router.put('/:section', protect, updateSection);
router.post('/reset', protect, adminOnly, resetContent);

module.exports = router;
