const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendFeedback = async (req, res) => {
  const { name, message, rating } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || 'lorimarfitness@gmail.com',
      subject: 'New Feedback Message',
      text: `Name: ${name || 'Anonymous'}\nRating: ${rating}\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Feedback sent' });
  } catch (error) {
    console.error('Feedback send error:', error);
    res.status(500).json({ error: 'Failed to send feedback' });
  }
};
