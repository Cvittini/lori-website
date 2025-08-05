import React, { useState } from 'react';
import '../Styles/harmonized-styles.css';

const Plans = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    likes: '',
    dislikes: '',
    allergies: '',
    mealsPerDay: '',
    height: '',
    weight: '',
    fitnessLevel: '',
    goal: '',
    workoutLocation: '',
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
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        alert('Plan submitted successfully!');
        setFormData({
          name: '', email: '', age: '', likes: '', dislikes: '', allergies: '',
          mealsPerDay: '', height: '', weight: '', fitnessLevel: '', goal: '', workoutLocation: ''
        });
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error(error);
      alert('Submission failed');
    }
  };

  return (
    <div className="main-container">
      <h2 className="section-title">Custom Plan Request</h2>
      <p className="section-description">
        $50 for 3 weeks of one-on-one coaching including weekly check-ins.
      </p>

      <form className="form-container" onSubmit={handleSubmit}>
        <input className="form-input" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input className="form-input" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input className="form-input" name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" required />

        <input className="form-input" name="likes" value={formData.likes} onChange={handleChange} placeholder="Liked foods" />
        <input className="form-input" name="dislikes" value={formData.dislikes} onChange={handleChange} placeholder="Disliked foods" />
        <input className="form-input" name="allergies" value={formData.allergies} onChange={handleChange} placeholder="Allergies" />
        <input className="form-input" name="mealsPerDay" value={formData.mealsPerDay} onChange={handleChange} placeholder="Meals per day" />

        <input className="form-input" name="height" value={formData.height} onChange={handleChange} placeholder="Height (e.g. 5'7 or 170cm)" />
        <input className="form-input" name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight (e.g. 160 lbs or 72kg)" />

        <select className="form-select" name="fitnessLevel" value={formData.fitnessLevel} onChange={handleChange} required>
          <option value="">Select fitness level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <select className="form-select" name="goal" value={formData.goal} onChange={handleChange} required>
          <option value="">Select goal</option>
          <option value="lose">Lose Weight</option>
          <option value="gain">Gain Weight</option>
          <option value="build">Build Muscle</option>
        </select>

        <select className="form-select" name="workoutLocation" value={formData.workoutLocation} onChange={handleChange} required>
          <option value="">Workout location</option>
          <option value="home">Home</option>
          <option value="gym">Gym</option>
        </select>

        <button className="form-submit" type="submit">Submit Plan</button>
      </form>
    </div>
  );
};

export default Plans;
