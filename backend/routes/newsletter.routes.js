const express = require('express');
const router = express.Router();

// Simple in-memory store; replace with a DB model (e.g. Newsletter.model.js) for production
const subscribers = new Set();

/**
 * @route  POST /api/newsletter/subscribe
 * @access Public
 */
router.post('/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ status: 'error', message: 'Please provide a valid email address.' });
  }

  if (subscribers.has(email)) {
    return res.status(200).json({ status: 'success', message: 'Already subscribed!' });
  }

  subscribers.add(email);
  console.log(`📧 New newsletter subscriber: ${email}`);

  res.status(201).json({
    status: 'success',
    message: 'Successfully subscribed to the Intelligence Network.',
    data: { email }
  });
});

module.exports = router;
