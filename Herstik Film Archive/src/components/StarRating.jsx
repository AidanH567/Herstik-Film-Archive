import { useState } from "react";

export default function StarRating({ rating, setRating }) {
  // max stars
  const maxStars = 5;

  // handle click on star or half-star
  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <div className="star-rating">
      {[...Array(maxStars)].map((_, i) => {
        const fullStarValue = i + 1;
        const halfStarValue = i + 0.5;

        return (
          <span key={i} className="star-container">
            {/* Half star */}
            <span
              className={`star half-star ${
                rating >= halfStarValue ? "filled" : ""
              }`}
              onClick={() => handleClick(halfStarValue)}
            >
              ⯨
            </span>
            {/* Full star */}
            <span
              className={`star full-star ${
                rating >= fullStarValue ? "filled" : ""
              }`}
              onClick={() => handleClick(fullStarValue)}
            >
              ★
            </span>
          </span>
        );
      })}
    </div>
  );
}