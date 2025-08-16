const { sendEmail } = require('./_shared/email');
const { saveToSupabase } = require('./_shared/supabase');

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
  await Promise.all([
    sendEmail({ subject: 'Newsletter Signup', text }),
    saveToSupabase('newsletter', { email }),
  ]);
  res.status(200).json({ ok: true });
};
