import React, { useMemo, useState } from "react";
import "../Styles/harmonized-styles.css";
import EventCard from "../components/EventCard/EventCard";
import eventsData from "../data/events";
import { postReservation } from "../lib/api";

const sortEvents = (arr) =>
  [...arr].sort((a, b) => {
    const ad = `${a.date || ""} ${a.time || ""}`;
    const bd = `${b.date || ""} ${b.time || ""}`;
    return ad.localeCompare(bd);
  });

export default function EventPage() {
  const events = useMemo(() => sortEvents(eventsData), []);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventId: events.length ? events[0].id : "",
  });
  const selected = events.find((e) => e.id === form.eventId) || events[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.eventId) {
      alert("Please fill name, email, and select an event.");
      return;
    }

    try {
      await postReservation({
        name: form.name,
        email: form.email,
        phone: form.phone,
        eventId: form.eventId,
      });
      alert("Reservation submitted! We'll be in touch soon.");
      setForm({ name: "", email: "", phone: "", eventId: events[0]?.id || "" });
    } catch (err) {
      console.error("Reservation submit error:", err);
      alert("Failed to submit reservation. Please try again later.");
    }
  };

  return (
    <div className="event-page">
      {/* Hero */}
      <section className="hero hero--subtle">
        <div className="container hero-inner">
          <h1>Join Our Community Workouts</h1>
          <p>One-hour sessions, great vibes, and healthy fuel available.</p>
          <a href="#register" className="cta-button">Register Now</a>
        </div>
      </section>

      {/* Events */}
      <section className="events-section">
        <div className="container">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="event-grid">
            {events.length === 0 ? (
              <p className="muted">No events yet. Check back soon!</p>
            ) : (
              events.map((evt) => <EventCard key={evt.id} {...evt} />)
            )}
          </div>
        </div>
      </section>

      {/* Registration */}
      <section id="register" className="registration-section">
        <div className="container">
          <h2 className="section-title">Register Now</h2>

          <form className="registration-form card" onSubmit={handleSubmit} autoComplete="off">
            <div className="form-row">
              <label htmlFor="eventIdSelect">Event</label>
              <select
                id="eventIdSelect"
                name="eventIdSelect"
                value={form.eventId}
                onChange={(e) =>
                  handleChange({ target: { name: "eventId", value: e.target.value } })
                }
                required
              >
                {events.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.title} — {e.date} {e.time ? `• ${e.time}` : ""}
                  </option>
                ))}
              </select>
              <input type="hidden" name="eventId" value={form.eventId} />
            </div>

            <div className="form-row">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="phone">Phone (optional)</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn-primary">Reserve Spot</button>
            <p className="muted small">We'll confirm your reservation by email.</p>
          </form>
        </div>
      </section>
    </div>
  );
}
