import React from "react";
// correct relative path to the shared styles (two levels up)
import "../../Styles/harmonized-styles.css";

export default function EventCard({
  image = "/images/zumba.jpg",
  title = "",
  description = "",
  date = "",
  time = "",
  location = "",
  tags = [],
}) {
  return (
    <article className="event-card">
      {image && <img className="event-banner" src={image} alt={title || "Event"} />}
      <div className="event-content">
        {title && <h3>{title}</h3>}
        {(date || time || location) && (
          <p className="event-meta">
            {date}{date && time ? " • " : ""}{time}
            {(date || time) && location ? " — " : ""}{location}
          </p>
        )}
        {description && <p className="event-desc">{description}</p>}
        {Array.isArray(tags) && tags.length > 0 && (
          <div className="event-tags">
            {tags.map((t, i) => (
              <span className="tag-pill" key={i}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
