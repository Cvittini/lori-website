import React from 'react';
import './EventCard.css';

const EventCard = ({
  image,
  title,
  description,
  date,
  time,
  location,
  tags = [],
}) => {
  return (
    <div className="event-card">
      <img src={image} alt={title} className="event-image" />

      <div className="event-details">
        <h2 className="event-title">{title}</h2>
        <p className="event-description">{description}</p>

        <div className="event-meta">
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>
          <p><strong>Location:</strong> {location}</p>
        </div>

        <div className="event-tags">
          {tags.map((tag, index) => (
            <span key={index} className="event-tag">{tag}</span>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default EventCard;
