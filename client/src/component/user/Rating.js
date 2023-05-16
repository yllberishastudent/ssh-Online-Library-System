import React from "react";
import "./style/Rating.css";

const Rating = ({ rating, onRatingChange }) => {
  const MAX_RATING = 5;

  const handleStarClick = (newRating) => {
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const renderStar = (starNumber) => {
    const filled = starNumber <= Math.floor(rating); // Check if the star should be filled
    const halfFilled = starNumber === Math.ceil(rating) && rating % 1 !== 0; // Check if the star should be half-filled

    let starClassName = "star";
    if (filled) {
      starClassName += " filled";
    } else if (halfFilled) {
      starClassName += " half-filled";
    }

    return (
      <span
        key={starNumber}
        className={starClassName}
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
