// backend/models/Plan.js
const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  dislikedFoods: String,
  allergies: String,
  preferredMeals: String,
  height: String,
  weight: String,
  fitnessLevel: String,
  goal: String,
  workoutAccess: String,
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);
