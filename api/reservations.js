const { sendEmail } = require('./_shared/email');
const { saveToSupabase } = require('./_shared/supabase');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { name, email, phone, eventId } = req.body || {};
  if (!name || !email || !eventId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const text =
    `New reservation` +
    `\nName: ${name}` +
    `\nEmail: ${email}` +
    (phone ? `\nPhone: ${phone}` : '') +
    `\nEvent ID: ${eventId}`;
  await Promise.all([
    sendEmail({ subject: 'New Event Reservation', text }),
    saveToSupabase('reservations', {
      name,
      email,
      phone,
      event_id: eventId,
    }),
  ]);
  res.status(200).json({ ok: true });
};
