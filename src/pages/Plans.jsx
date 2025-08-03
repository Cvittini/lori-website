import React, { useState } from 'react';
import "./Plans.css";

const Plans = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dislikedFoods: '',
    preferredMeals: '',
    allergies: '',
    height: '',
    weight: '',
    fitnessLevel: '',
    goal: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert("Your plan request has been received!");
    // You can POST to backend here later
  };

  return (
    <div className="plans-page">
      <h1>Customized Plans</h1>
      <div className="form-sections">
        {/* Nutrition Plan */}
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Nutrition Plan</h2>
          <input type="text" name="name" placeholder="Your Name" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Your Email" required onChange={handleChange} />
          <textarea name="dislikedFoods" placeholder="Foods you dislike" onChange={handleChange}></textarea>
          <textarea name="allergies" placeholder="Food allergies (if any)" onChange={handleChange}></textarea>
          <label>How many meals per day?</label>
          <select name="preferredMeals" onChange={handleChange}>
            <option value="">Select</option>
            <option value="2">2 meals</option>
            <option value="3">3 meals</option>
            <option value="4">4 meals</option>
            <option value="5">5 meals</option>
          </select>
        </form>

        {/* Exercise Plan */}
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Exercise Plan</h2>
          <input type="number" name="height" placeholder="Height in cm" required onChange={handleChange} />
          <input type="number" name="weight" placeholder="Weight in kg" required onChange={handleChange} />
          <label>Fitness Level</label>
          <select name="fitnessLevel" onChange={handleChange}>
            <option value="">Select</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <label>Goal</label>
          <select name="goal" onChange={handleChange}>
            <option value="">Select</option>
            <option value="lose">Lose weight</option>
            <option value="gain">Gain weight</option>
            <option value="muscle">Build muscle</option>
          </select>
          <button type="submit">Submit Plan Request</button>
        </form>
      </div>
    </div>
  );
};

export default Plans;
