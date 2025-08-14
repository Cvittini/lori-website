const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { submitPlan } = require('../controllers/planController');

router.post(
  '/',
  [
    body('name').trim().notEmpty(),
    body('email').trim().isEmail().normalizeEmail(),
    body('age').optional().isInt({ min: 0 }),
    body('dislikedFoods').optional().trim().escape(),
    body('allergies').optional().trim().escape(),
    body('preferredMeals').optional().trim().escape(),
    body('height').optional().trim().escape(),
    body('weight').optional().trim().escape(),
    body('fitnessLevel').optional().trim().escape(),
    body('goal').optional().trim().escape(),
    body('workoutAccess').optional().trim().escape(),
  ],
  submitPlan
);

module.exports = router;
