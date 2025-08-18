import React, { useState } from "react";
import "../Styles/harmonized-styles.css";
import emailjs from 'emailjs-com';
import { isValidEmail } from "../lib/email";

const SERVICE_ID = 'service_839t84l';
const TEMPLATE_ID = 'template_lbtk24d';
const PUBLIC_KEY = 'QYkr433CtbV-jJkbi';

const Plans = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    dislikedFoods: "",
    allergies: "",
    preferredMeals: "",
    height: "",
    weight: "",
    fitnessLevel: "",
    goal: "",
    workoutAccess: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState(null); // {type, text}

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return;
    if (
      !formData.name ||
      !isValidEmail(formData.email) ||
      !formData.age ||
      !formData.preferredMeals ||
      !formData.height ||
      !formData.weight ||
      !formData.fitnessLevel ||
      !formData.goal ||
      !formData.workoutAccess
    ) {
      setStatus({ type: "error", text: "Please fill out all required fields with valid information." });
      return;
    }

    try {
      const message = `Name: ${formData.name}\nEmail: ${formData.email}\nAge: ${formData.age}\nHeight: ${formData.height}\nWeight: ${formData.weight}\nFitness Level: ${formData.fitnessLevel}\nGoal: ${formData.goal}\nWorkout Access: ${formData.workoutAccess}\nDisliked Foods: ${formData.dislikedFoods}\nAllergies: ${formData.allergies}\nMeals per day: ${formData.preferredMeals}`;

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: 'lorimarfitness@gmail.com',
          subject: 'Plan Request',
          message,
          reply_to: formData.email,
        },
        PUBLIC_KEY,
      );
      setStatus({ type: "success", text: "Thank you! Your custom plan request was submitted." });
      setFormData({
        name: "",
        email: "",
        age: "",
        dislikedFoods: "",
        allergies: "",
        preferredMeals: "",
        height: "",
        weight: "",
        fitnessLevel: "",
        goal: "",
        workoutAccess: "",
      });
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", text: "Submission failed. Please try again." });
    }
  };

  return (
    <div className="plans-container">
      <h1>Fitness Plan</h1>
      <p className="plans-description">
        💪 For just <strong>$50</strong>, receive 3 weeks of personalized
        coaching including one-on-one check-ins and weekly progress calls to
        adjust your nutrition and exercise plans.
      </p>

      <form className="plan-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          required
          value={formData.age}
          onChange={handleChange}
        />
        <textarea
          name="dislikedFoods"
          placeholder="Foods you dislike"
          value={formData.dislikedFoods}
          onChange={handleChange}
        ></textarea>
        <textarea
          name="allergies"
          placeholder="Allergies (if any)"
          value={formData.allergies}
          onChange={handleChange}
        ></textarea>
        <label>Meals per day</label>
        <select
          name="preferredMeals"
          required
          value={formData.preferredMeals}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="2">2 meals</option>
          <option value="3">3 meals</option>
          <option value="4">4 meals</option>
          <option value="5">5 meals</option>
        </select>
        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          required
          value={formData.height}
          onChange={handleChange}
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          required
          value={formData.weight}
          onChange={handleChange}
        />
        <label>Fitness Level</label>
        <select
          name="fitnessLevel"
          required
          value={formData.fitnessLevel}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <label>Workout Goal</label>
        <select
          name="goal"
          required
          value={formData.goal}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="lose">Lose weight</option>
          <option value="gain">Gain weight</option>
          <option value="muscle">Build muscle</option>
        </select>
        <label>Workout Access</label>
        <select
          name="workoutAccess"
          required
          value={formData.workoutAccess}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="gym">Gym</option>
          <option value="home">Home</option>
        </select>

        <button type="submit">Submit Plan</button>
        {/* Honeypot */}
        <input
          type="text"
          name="nickname"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ display: "none" }}
          tabIndex="-1"
          autoComplete="off"
        />
        {status && <p className={`form-message ${status.type}`}>{status.text}</p>}
      </form>
    </div>
  );
};

export default Plans;
