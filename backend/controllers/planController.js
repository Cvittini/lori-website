const nodemailer = require('nodemailer');
require('dotenv').config();

exports.submitPlan = async (req, res) => {
  try {
    const {
      name,
      email,
      age,
      dislikedFoods,
      allergies,
      preferredMeals,
      height,
      weight,
      fitnessLevel,
      goal,
      workoutAccess,
    } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'lorimarfitness@gmail.com',
      subject: 'New Custom Plan Submission',
      text: `
📬 New plan submission:

Name: ${name}
Email: ${email}
Age: ${age}

Disliked Foods: ${dislikedFoods}
Allergies: ${allergies}
Meals per Day: ${preferredMeals}

Height: ${height}
Weight: ${weight}
Fitness Level: ${fitnessLevel}
Goal: ${goal}
Workout Access: ${workoutAccess}

🕒 Submitted at: ${new Date().toISOString()}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Plan submitted and email sent' });
  } catch (error) {
    console.error('Submit plan error:', error);
    res.status(500).json({ error: 'Failed to submit plan' });
  }
};
