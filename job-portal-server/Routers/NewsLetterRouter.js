const express = require('express');
const router = express.Router();
const NewsletterSubscriber = require('../Models/NewsLetter');
const ensureAuthenticated = require('../Controllers/Auth');
const sendEmail = require("../Utils/sendEmail");

// POST /subscribe
router.post('/subscribe', ensureAuthenticated,async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({ message: 'Email is required' });

  try {
    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: 'Already subscribed' });
    }

    await NewsletterSubscriber.create({ email });

    // Call the sendEmail function from utils
    const subject = 'You have subscribed to JobPortal Newsletter!';
    const htmlContent = `
      <p>Hi there,</p>
      <p>Thanks for subscribing to <strong>JobPortal</strong>!</p>
      <p>We’ll keep you updated with the latest job openings.</p>
    `;

    await sendEmail(email, subject, htmlContent);

    return res.status(200).json({ message: 'Subscribed and confirmation email sent!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
