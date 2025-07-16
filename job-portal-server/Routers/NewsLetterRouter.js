const express = require('express');
const router = express.Router();
const NewsletterSubscriber = require('../Models/NewsLetter');

// POST /subscribe
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({ message: 'Email is required' });

  try {
    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: 'Already subscribed' });
    }

    await NewsletterSubscriber.create({ email });
    return res.status(200).json({ message: 'Subscribed successfully!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
