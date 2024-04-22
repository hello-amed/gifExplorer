import React, { useState } from "react";
import { CardItem } from "../../../types";

interface CardProps {
  cardItem: CardItem;
  onSave?: () => void;
  onUnsave: () => void;
  isSaved: boolean;
}

const Card: React.FC<CardProps> = ({ cardItem, onSave, onUnsave, isSaved }) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleSaveClick = () => {
    setIsRotating(true);
    onSave && onSave();
  };

  const handleUnsaveClick = () => {
    setIsRotating(true);
    onUnsave();
  };

  const onAnimationEnd = () => {
    setIsRotating(false);
  };

  return (
    <div className={`card-item ${isRotating ? "rotate" : ""}`}>
      <div className="card-image">
        <img src={cardItem.images.original.url} alt={cardItem.title} />
      </div>
      {isSaved ? (
        <svg
          onClick={handleUnsaveClick}
          onAnimationEnd={onAnimationEnd}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="red"
          stroke="white"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg
          onClick={handleSaveClick}
          onAnimationEnd={onAnimationEnd}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="white"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      )}
    </div>
  );
};

export default Card;
