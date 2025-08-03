import React from 'react';
import './Blog.css';

const Blog = ({
  title = "Untitled Event",
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  images = [],
  description = "No description provided."
}) => {
  return (
    <div className="blog-post">
      <h2 className="blog-title">{title}</h2>

      <div className="blog-content">
        {/* Video */}
        <div className="blog-video">
          <iframe
            src={videoUrl}
            title="Event Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        {/* Carousel */}
        {Array.isArray(images) && images.length > 0 ? (
          <div className="blog-carousel">
            {images.map((img, index) => (
              <img key={index} src={img} alt={`Event image ${index + 1}`} />
            ))}
          </div>
        ) : (
          <p style={{ color: '#999', fontStyle: 'italic' }}>No images available.</p>
        )}

        {/* Description */}
        <div className="blog-description">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
