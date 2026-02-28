const express = require('express');
const router = express.Router();
const { protect, optionalProtect, adminOnly } = require('../middleware/auth.middleware');
const {
  getAllInsights,
  getInsightBySlug,
  createInsight,
  updateInsight,
  deleteInsight,
  likeInsight,
  shareInsight
} = require('../controllers/insight.controller');

// Public routes (optionalProtect allows admin to see drafts)
router.get('/', optionalProtect, getAllInsights);
router.get('/:slug', getInsightBySlug);
router.post('/:id/like', likeInsight);
router.post('/:id/share', shareInsight);

// Protected routes
router.post('/', protect, createInsight);
router.put('/:id', protect, updateInsight);
router.delete('/:id', protect, adminOnly, deleteInsight);

module.exports = router;
