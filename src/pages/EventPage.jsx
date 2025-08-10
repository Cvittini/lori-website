import React, { useEffect, useState } from "react";
import "../Styles/harmonized-styles.css";
import EventCard from "../components/EventCard/EventCard";

// Works with Vite or CRA
const API =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_STRAPI_URL) ||
  process.env.REACT_APP_STRAPI_URL ||
  "http://localhost:1337";

const isPreview =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("preview") === "1";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    selectedEvent: "",
    honeypot: "", // spam trap
  });

  useEffect(() => {
    const load = async () => {
      try {
        // Build URL
        const url = new URL(`${API}/api/events`);
        // Try to populate the banner field; fall back to 'image' if your field is named differently
        url.searchParams.set("populate", "bannerImage,image");
        url.searchParams.set("sort", "date:asc");
        // Keep this if you created isActive; remove if you didn't
        url.searchParams.set("filters[isActive][$eq]", "true");
        // Preview draft content (requires proper permissions/token server-side; otherwise public will still see published only)
        if (isPreview) url.searchParams.set("publicationState", "preview");

        const res = await fetch(url.toString());
        const json = await res.json();

        const list = (json?.data || []).map((e) => {
          const a = e?.attributes || {};
          const bannerUrl =
            a?.bannerImage?.data?.attributes?.url ||
            a?.image?.data?.attributes?.url ||
            "";

          return {
            id: e.id,
            image: bannerUrl ? `${API}${bannerUrl}` : "/images/zumba.jpg",
            title: a.title || "",
            description: a.description || "",
            date: a.date || "",
            time: a.time || "",
            location: a.location || "",
            tags: a.includes ? a.includes.split(",").map((t) => t.trim()) : [],
          };
        });

        setEvents(list);
        if (list.length) {
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
    if (!form.fullName || !form.email || !form.selectedEvent) {
      alert("Please fill name, email, and select an event.");
      return;
    }

    try {
      const res = await fetch(`${API}/api/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      {/* Optional hero section (matches .hero and .cta-button styles) */}
      <section className="hero">
        <h1>Join Our Community Workouts</h1>
        <p>One-hour sessions, great vibes, and healthy fuel available.</p>
        <a href="#register" className="cta-button">Register Now</a>
      </section>

      {/* Events */}
      <section className="events-section">
        <h2>Upcoming Events</h2>
        {loading ? (
          <div>Loading events…</div>
        ) : (
          <div className="event-list">
            {events.length === 0 ? (
              <p>No events yet. Check back soon!</p>
            ) : (
              events.map((evt) => <EventCard key={evt.id} {...evt} />)
            )}
          </div>
        )}
      </section>

      {/* Registration Form */}
      <section id="register" className="registration-section">
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

      {/* FAQ */}
      <section className="faq-section">
        <h2>FAQs</h2>
        <div className="faq">
          <p><strong>What should I bring?</strong> Comfortable clothes, water, and a smile!</p>
          <p><strong>Is food included?</strong> Meals and drinks are available for purchase.</p>
        </div>
      </section>
    </div>
  );
}
