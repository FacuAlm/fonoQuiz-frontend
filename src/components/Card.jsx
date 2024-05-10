import React from "react";
import atras from "/images/back.png";

export const Card = ({ card, handleCardClick }) => {
  return (
    <div
      style={{ backgroundImage: `url(${atras})` }}
      className="card bg-cover bg-center rounded-lg shadow-lg cursor-pointer md:w-32 "
      onClick={() => handleCardClick(card.id)}
    >
      <div>
        <img
          src={card.img}
          alt={card.alt}
          className={`  scale-110 ${
            !card.flipped
              ? "[transform:rotateY(180deg)] [backface-visibility:hidden] transition-all duration-1000"
              : ""
          }`}
        />
      </div>
    </div>
  );
};
