const Plan = require('../models/Plan');
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.submitPlan = async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();

    // Email setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: 'New Custom Plan Submission',
      text: `
📬 New plan submission:

Name: ${plan.name}
Email: ${plan.email}
Age: ${plan.age}

Disliked Foods: ${plan.dislikedFoods}
Allergies: ${plan.allergies}
Meals per Day: ${plan.preferredMeals}

Height: ${plan.height}
Weight: ${plan.weight}
Fitness Level: ${plan.fitnessLevel}
Goal: ${plan.goal}
Workout Access: ${plan.workoutAccess}

🕒 Submitted at: ${plan.createdAt}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Plan submitted and email sent' });
  } catch (error) {
    console.error('Submit plan error:', error);
    res.status(500).json({ error: 'Failed to submit plan' });
  }
};
