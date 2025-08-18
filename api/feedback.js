const { sendEmail } = require('./_shared/email');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { name, email, message, rating } = req.body || {};
  if (!message || !rating) {
    return res.status(400).json({ error: 'Message and rating are required' });
  }
  const text =
    `New feedback` +
    (name ? `\nName: ${name}` : '') +
    (email ? `\nEmail: ${email}` : '') +
    `\nRating: ${rating}` +
    `\nMessage:\n${message}`;
  await sendEmail({ subject: 'New Feedback', text });
  res.status(200).json({ ok: true });
};
