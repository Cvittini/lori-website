const { sendEmail } = require('./_shared/email');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { email } = req.body || {};
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  const text = `New newsletter signup\nEmail: ${email}`;
  await sendEmail({ subject: 'Newsletter Signup', text });
  res.status(200).json({ ok: true });
};
