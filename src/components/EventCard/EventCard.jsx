import React from "react";
import "../../Styles/harmonized-styles.css";

export default function EventCard({
  image = "/images/zumba.jpg",   // make sure this exists in /public/images
  title = "Event",
  description = "",
  date = "",
  time = "",
  location = "",
  tags = [],
  price,            // optional
  isFeatured = false,
}) {
  const hasMeta = Boolean(date || time || location);

  return (
    <article className={`event-card${isFeatured ? " event-card--featured" : ""}`}>
      {/* Image */}
      {image && (
        <div className="event-image-wrap">
          <img
            className="event-image"
            src={image}
            alt={title}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          {isFeatured && <span className="event-badge">Featured</span>}
        </div>
      )}

      {/* Body */}
      <div className="event-details">
        <h3 className="event-title">{title}</h3>

        {hasMeta && (
          <div className="event-meta">
            {date && <span>{date}</span>}
            {time && <span>• {time}</span>}
            {location && <span> — {location}</span>}
          </div>
        )}

        {description && <p className="event-description">{description}</p>}

        {Array.isArray(tags) && tags.length > 0 && (
          <div className="event-tags">
            {tags.map((t, i) => (
              <span className="event-tag" key={`${t}-${i}`}>{t}</span>
            ))}
          </div>
        )}

        {(price ?? null) !== null && (
          <div className="event-price">${Number(price).toFixed(2)}</div>
        )}
      </div>
    </article>
  );
}
