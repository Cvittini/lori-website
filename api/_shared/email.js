const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FORMS_SEND_TO = process.env.FORMS_SEND_TO;
const FORMS_FROM_EMAIL = process.env.FORMS_FROM_EMAIL;

async function sendEmail({ subject, text }) {
  if (!RESEND_API_KEY || !FORMS_SEND_TO || !FORMS_FROM_EMAIL) {
    console.warn('Missing email environment variables');
    return;
  }
  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FORMS_FROM_EMAIL,
      to: FORMS_SEND_TO.split(',').map((s) => s.trim()),
      subject,
      text,
    }),
  });
  if (!resp.ok) {
    console.error('Resend API error', await resp.text());
  }
}

module.exports = { sendEmail };
