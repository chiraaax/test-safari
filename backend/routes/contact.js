const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/send-email', async (req, res) => {
  console.log('REQ BODY:', req.body); // DEBUG

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: 'New Contact Message',
      html: `
        <h3>New Contact Request</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('EMAIL ERROR:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
