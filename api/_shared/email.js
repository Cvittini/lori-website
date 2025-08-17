const emailjs = require('@emailjs/nodejs');

const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

async function sendEmail({ subject, text }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('Missing EmailJS environment variables');
    return;
  }
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        subject,
        message: text,
        to_email: 'lorimarfitness@gmail.com',
      },
      {
        publicKey: PUBLIC_KEY,
        privateKey: PRIVATE_KEY,
      },
    );
  } catch (err) {
    console.error('EmailJS send error', err);
  }
}

module.exports = { sendEmail };
