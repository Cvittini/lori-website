async function post(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export const postNewsletter = (email) => post('/api/newsletter', { email });
export const postReservation = (data) => post('/api/reservations', data);
export const postFeedback = (data) => post('/api/feedback', data);
export const postPlan = (data) => post('/api/plans', data);
