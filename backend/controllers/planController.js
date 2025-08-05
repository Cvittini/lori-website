// backend/controllers/planController.js
const Plan = require('../models/Plan');

exports.submitPlan = async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    res.status(201).json({ message: 'Plan submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit plan' });
  }
};
