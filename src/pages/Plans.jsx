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
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Thank you! Your custom plan request was submitted.");
        console.log('Submitted data:', formData);
        setFormData({
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
      } else {
        alert("Submission failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="plans-container">
      <h1>Get Your Personalized Plan</h1>
      <p className="plans-description">
        💪 For just <strong>$50</strong>, receive 3 weeks of personalized coaching including one-on-one check-ins and weekly progress calls to adjust your nutrition and exercise plans.
      </p>

      <form className="plans-grid" onSubmit={handleSubmit}>
        {/* Nutrition Form */}
        <div className="plan-card">
          <h2>Nutrition Plan</h2>
          <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} />
          <input type="number" name="age" placeholder="Age" required value={formData.age} onChange={handleChange} />
          <textarea name="dislikedFoods" placeholder="Foods you dislike" value={formData.dislikedFoods} onChange={handleChange}></textarea>
          <textarea name="allergies" placeholder="Allergies (if any)" value={formData.allergies} onChange={handleChange}></textarea>
          <label>Meals per day</label>
          <select name="preferredMeals" required value={formData.preferredMeals} onChange={handleChange}>
            <option value="">Select</option>
            <option value="2">2 meals</option>
            <option value="3">3 meals</option>
            <option value="4">4 meals</option>
            <option value="5">5 meals</option>
          </select>
        </div>

        {/* Exercise Form */}
        <div className="plan-card">
          <h2>Exercise Plan</h2>
          <input type="number" name="height" placeholder="Height (cm)" required value={formData.height} onChange={handleChange} />
          <input type="number" name="weight" placeholder="Weight (kg)" required value={formData.weight} onChange={handleChange} />
          <label>Fitness Level</label>
          <select name="fitnessLevel" required value={formData.fitnessLevel} onChange={handleChange}>
            <option value="">Select</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <label>Workout Goal</label>
          <select name="goal" required value={formData.goal} onChange={handleChange}>
            <option value="">Select</option>
            <option value="lose">Lose weight</option>
            <option value="gain">Gain weight</option>
            <option value="muscle">Build muscle</option>
          </select>
          <label>Workout Access</label>
          <select name="workoutAccess" required value={formData.workoutAccess} onChange={handleChange}>
            <option value="">Select</option>
            <option value="gym">Gym</option>
            <option value="home">Home</option>
          </select>

          <button type="submit">Submit Plan</button>
        </div>
      </form>
    </div>
  );
};

export default Plans;
