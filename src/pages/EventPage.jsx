import React, { useEffect, useState } from "react";
import "../Styles/harmonized-styles.css";
import EventCard from "../components/EventCard/EventCard";

// Works with either Vite or CRA env vars
const API =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_STRAPI_URL) ||
  process.env.REACT_APP_STRAPI_URL ||
  "http://localhost:1337";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Registration form state
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    selectedEvent: "",
    honeypot: "", // leave empty (spam trap)
  });

  useEffect(() => {
    const load = async () => {
      try {
        // Pull only active events, with banner image
        const res = await fetch(
          `${API}/api/events?populate=bannerImage&filters[isActive][$eq]=true&sort=date:asc`
        );
        const json = await res.json();
        const list = (json?.data || []).map((e) => {
          const a = e.attributes || {};
          const bannerUrl = a.bannerImage?.data?.attributes?.url || "";
          return {
            id: e.id,
            image: bannerUrl ? `${API}${bannerUrl}` : "/images/zumba.jpg", // fallback
            title: a.title,
            description: a.description,
            date: a.date,
            time: a.time,
            location: a.location,
            tags: a.includes ? a.includes.split(",").map((t) => t.trim()) : [],
          };
        });

        setEvents(list);
        // Pre-select first event in the registration form
        if (list.length && !form.selectedEvent) {
          setForm((f) => ({ ...f, selectedEvent: String(list[0].id) }));
        }
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Minimal client validation
    if (!form.fullName || !form.email || !form.selectedEvent) {
      alert("Please fill name, email, and select an event.");
      return;
    }

    try {
      const res = await fetch(`${API}/api/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Strapi v4 expects { data: {...} }
        body: JSON.stringify({
          data: {
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
            selectedEvent: Number(form.selectedEvent),
            honeypot: form.honeypot, // must be empty
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to submit registration");

      alert("Registered! You’ll get a confirmation email shortly.");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        selectedEvent: events.length ? String(events[0].id) : "",
        honeypot: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="event-page">
      {/* Upcoming Events */}
      <section className="events-section">
        <h2>Upcoming Events</h2>

        {loading ? (
          <div>Loading events…</div>
        ) : (
          <div className="event-list">
            {events.length === 0 ? (
              <p>No events yet. Check back soon!</p>
            ) : (
              events.map((event) => <EventCard key={event.id} {...event} />)
            )}
          </div>
        )}
      </section>

      {/* Registration Form */}
      <section className="registration-section">
        <h2>Register Now</h2>
        <form className="registration-form" onSubmit={handleSubmit} autoComplete="off">
          {/* hidden honeypot (anti-bot) */}
          <input
            type="text"
            name="honeypot"
            value={form.honeypot}
            onChange={handleChange}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          <select
            name="selectedEvent"
            value={form.selectedEvent}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select an event
            </option>
            {events.map((e) => (
              <option key={e.id} value={e.id}>
                {e.title} — {e.date} {e.time ? `• ${e.time}` : ""}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />
          <button type="submit">Reserve Spot</button>
        </form>
      </section>

      {/* FAQ (you can also move FAQs into Strapi later) */}
      <section className="faq-section">
        <h2>FAQs</h2>
        <div className="faq">
          <p>
            <strong>What should I bring?</strong> Comfortable clothes, water, and a smile!
          </p>
          <p>
            <strong>Is food included?</strong> No, but meals and drinks are available for purchase.
          </p>
        </div>
      </section>
    </div>
  );
};

export default EventPage;
