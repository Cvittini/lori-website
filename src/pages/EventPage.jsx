import React, { useMemo, useState } from "react";
import "../Styles/harmonized-styles.css";
import EventCard from "../components/EventCard/EventCard";
import eventsData from "../data/events";

const sortEvents = (arr) =>
  [...arr].sort((a, b) => {
    const ad = `${a.date || ""} ${a.time || ""}`;
    const bd = `${b.date || ""} ${b.time || ""}`;
    return ad.localeCompare(bd);
  });

const enc = (s) => encodeURIComponent(String(s || ""));

export default function EventPage() {
  const events = useMemo(() => sortEvents(eventsData), []);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    selectedEventId: events.length ? events[0].id : "",
  });
  const selected = events.find((e) => e.id === form.selectedEventId) || events[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.selectedEventId) {
      alert("Please fill name, email, and select an event.");
      return;
    }

    const subject = `Event Registration — ${selected?.title || ""}`;
    const body =
      `Name: ${form.fullName}\n` +
      `Email: ${form.email}\n` +
      (form.phone ? `Phone: ${form.phone}\n` : "") +
      `Event: ${selected?.title || ""}\n` +
      `Date/Time: ${selected?.date || ""} ${selected?.time || ""}\n` +
      `Location: ${selected?.location || ""}\n` +
      (selected?.price ? `Price: $${selected.price}\n` : "") +
      `\nPlease confirm my spot.`;

    window.location.href = `mailto:lorimarfitness@gmail.com?subject=${enc(subject)}&body=${enc(body)}`;
  };

  return (
    <div className="event-page">
      {/* Hero */}
      <section className="hero hero--subtle">
        <div className="hero-inner">
          <h1>Join Our Community Workouts</h1>
          <p>One-hour sessions, great vibes, and healthy fuel available.</p>
          <a href="#register" className="cta-button">Register Now</a>
        </div>
      </section>

      {/* Events */}
      <section className="events-section">
        <h2 className="section-title">Upcoming Events</h2>
        <div className="event-list event-grid">
          {events.length === 0 ? (
            <p className="muted">No events yet. Check back soon!</p>
          ) : (
            events.map((evt) => <EventCard key={evt.id} {...evt} />)
          )}
        </div>
      </section>

      {/* Registration */}
      <section id="register" className="registration-section">
        <h2 className="section-title">Register Now</h2>

        <form className="registration-form card" onSubmit={handleSubmit} autoComplete="off">
          <div className="form-row">
            <label htmlFor="selectedEventId">Event</label>
            <select
              id="selectedEventId"
              name="selectedEventId"
              value={form.selectedEventId}
              onChange={handleChange}
              required
            >
              {events.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.title} — {e.date} {e.time ? `• ${e.time}` : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
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
          <p className="muted small">This opens your email app to send your registration.</p>
        </form>
      </section>
    </div>
  );
}
