const { sendEmail } = require('./_shared/email');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const {
    name,
    email,
    age,
    disliked_foods,
    allergies,
    meals_per_day,
    height_cm,
    weight_kg,
    fitness_level,
    goal,
    workout_access,
  } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const text =
    `New plan request` +
    `\nName: ${name}` +
    `\nEmail: ${email}` +
    (age ? `\nAge: ${age}` : '') +
    (disliked_foods ? `\nDisliked foods: ${disliked_foods}` : '') +
    (allergies ? `\nAllergies: ${allergies}` : '') +
    (meals_per_day ? `\nMeals per day: ${meals_per_day}` : '') +
    (height_cm ? `\nHeight cm: ${height_cm}` : '') +
    (weight_kg ? `\nWeight kg: ${weight_kg}` : '') +
    (fitness_level ? `\nFitness level: ${fitness_level}` : '') +
    (goal ? `\nGoal: ${goal}` : '') +
    (workout_access ? `\nWorkout access: ${workout_access}` : '');
  await sendEmail({ subject: 'New Plan Request', text });
  res.status(200).json({ ok: true });
};
