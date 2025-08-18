const emailjs = require('@emailjs/nodejs');

const SERVICE_ID = 'service_839t84l';
const TEMPLATE_ID = 'template_lbtk24d';
const PUBLIC_KEY = 'QYkr433CtbV-jJkbi';

async function sendEmail({ subject, text }) {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        subject,
        message: text,
        to_email: 'lorimarfitness@gmail.com',
      },
      { publicKey: PUBLIC_KEY },
    );
  } catch (err) {
    console.error('EmailJS send error', err);
  }
}

module.exports = { sendEmail };
