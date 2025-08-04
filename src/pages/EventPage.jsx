import React from "react";
import '../Styles/harmonized-styles.css';
import EventCard from "../components/EventCard/EventCard";

const EventPage = () => {
  const events = [
    {
      image: "/images/zumba.jpg",
      title: "Zumba Energy Blast",
      description:
        "Dance your way to fitness and enjoy a smoothie after class.",
      date: "July 30, 2025",
      time: "6:00 PM",
      location: "Lorimar Studio - Bronx, NY",
      tags: ["Zumba", "Smoothie", "Fun"],
    },
  ];

  return (
    <div className="event-page">

      {/* Upcoming Events */}
      <section className="events-section">
        <h2>Upcoming Events</h2>
        <div className="event-list">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </section>

      {/* Registration Form */}
      <section className="registration-section">
        <h2>Register Now</h2>
        <form className="registration-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="tel" placeholder="Phone Number" required />
          <button type="submit">Reserve Spot</button>
        </form>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <h2>FAQs</h2>
        <div className="faq">
          <p>
            <strong>What should I bring?</strong> Comfortable clothes, water,
            and a smile!
          </p>
          <p>
            <strong>Is food included?</strong> No, but meals and drinks are
            available for purchase.
          </p>
        </div>
      </section>
    </div>
  );
};

export default EventPage;
