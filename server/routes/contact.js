const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const router = express.Router();

// Store file in memory
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('attachment'), async (req, res) => {
  const { name, email, message } = req.body;
  const file = req.file;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Message from ${name}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
      attachments: file
        ? [
            {
              filename: file.originalname,
              content: file.buffer,
            },
          ]
        : [],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

module.exports = router;
