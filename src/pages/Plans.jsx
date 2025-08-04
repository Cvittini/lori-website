import React, { useState } from 'react';
import '../Styles/harmonized-styles.css';

const Plans = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    dislikedFoods: '',
    allergies: '',
    preferredMeals: '',
    height: '',
    weight: '',
    fitnessLevel: '',
    goal: '',
    workoutAccess: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    alert("Thank you! Your custom plan request was submitted.");
  };

  return (
    <div className="plans-container">
      <h1>Get Your Personalized Plan</h1>
      <p className="plans-description">
        💪 For just <strong>$50</strong>, receive 3 weeks of personalized coaching including one-on-one check-ins and weekly progress calls to adjust your nutrition and exercise plans.
      </p>

      <div className="plans-grid">
        {/* Nutrition Form */}
        <form className="plan-card" onSubmit={handleSubmit}>
          <h2>Nutrition Plan</h2>
          <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
          <input type="number" name="age" placeholder="Age" required onChange={handleChange} />
          <textarea name="dislikedFoods" placeholder="Foods you dislike" onChange={handleChange}></textarea>
          <textarea name="allergies" placeholder="Allergies (if any)" onChange={handleChange}></textarea>
          <label>Meals per day</label>
          <select name="preferredMeals" required onChange={handleChange}>
            <option value="">Select</option>
            <option value="2">2 meals</option>
            <option value="3">3 meals</option>
            <option value="4">4 meals</option>
            <option value="5">5 meals</option>
          </select>
        </form>

        {/* Exercise Form */}
        <form className="plan-card" onSubmit={handleSubmit}>
          <h2>Exercise Plan</h2>
          <input type="number" name="height" placeholder="Height (cm)" required onChange={handleChange} />
          <input type="number" name="weight" placeholder="Weight (kg)" required onChange={handleChange} />
          <label>Fitness Level</label>
          <select name="fitnessLevel" required onChange={handleChange}>
            <option value="">Select</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <label>Workout Goal</label>
          <select name="goal" required onChange={handleChange}>
            <option value="">Select</option>
            <option value="lose">Lose weight</option>
            <option value="gain">Gain weight</option>
            <option value="muscle">Build muscle</option>
          </select>
          <label>Workout Access</label>
          <select name="workoutAccess" required onChange={handleChange}>
            <option value="">Select</option>
            <option value="gym">Gym</option>
            <option value="home">Home</option>
          </select>
          <button type="submit">Submit Plan</button>
        </form>
      </div>
    </div>
  );
};

export default Plans;
