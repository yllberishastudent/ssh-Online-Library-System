import React from "react";
import "./Rating.css";

const Rating = ({ rating, onRatingChange }) => {
  const MAX_RATING = 5;

  const handleStarClick = (newRating) => {
    onRatingChange(newRating);
  };

  const renderStar = (starNumber) => {
    const filled = starNumber <= rating;
    return (
      <span
        key={starNumber}
        className={filled ? "star filled" : "star"}
        onClick={() => handleStarClick(starNumber)}
      >
        ★
      </span>
    );
  };

  const stars = [];
  for (let i = 1; i <= MAX_RATING; i++) {
    stars.push(renderStar(i));
  }

  return <div className="rating">{stars}</div>;
};

export default Rating;
