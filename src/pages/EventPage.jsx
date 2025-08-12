import React, { useEffect, useState } from "react";
import "../Styles/harmonized-styles.css";
import EventCard from "../components/EventCard/EventCard";
import { fetchStrapi, mediaUrl } from "../services/strapiClient";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // Strapi v4 populate syntax — this avoids the old "Invalid key bannerImage,image" error
        const data = await fetchStrapi("/api/events", { params: { populate: "*" } });
        setEvents(Array.isArray(data?.data) ? data.data : []);
      } catch (e) {
        setError(e.message || "Failed to load events.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="event-page">Loading events…</div>;
  if (error) return <div className="event-page error">Error: {error}</div>;

  return (
    <div className="event-page">
      <section className="events-section">
        <h2>Upcoming Events</h2>

        <div className="event-list">
          {events.map((item) => {
            const id = item.id;
            const a = item.attributes || {};

            // Try common image fields from your repo/Strapi models
            const imgUrl =
              mediaUrl(a?.bannerImage?.data?.attributes?.url) ||
              mediaUrl(a?.image?.data?.attributes?.url) ||
              "";

            return (
              <EventCard
                key={id}
                title={a.title || "Untitled Event"}
                date={a.date || a.startDate || ""}
                location={a.location || ""}
                description={a.description || ""}
                image={imgUrl}
                // add any other fields your EventCard expects
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default EventPage;
