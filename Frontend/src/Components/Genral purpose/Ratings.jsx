import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({
  max = 5,
  value = 0,
  readOnly = false,
  onRatingSelect = () => {},
  starColor = "",
}) => {
  const [hoverRating, setHoverRating] = useState(null);
  const [internalValue, setInternalValue] = useState(value);

  const displayValue = hoverRating ?? internalValue;

  const getStarType = (index) => {
    if (displayValue >= index) return "full";
    if (displayValue >= index - 0.5) return "half";
    return "empty";
  };

  const handleClick = (index, isHalf) => {
    if (readOnly) return;
    const newRating = isHalf ? index - 0.5 : index;
    setInternalValue(newRating);
    onRatingSelect(newRating);
  };
  const fullStar = (
    <div>
      <h1 className={` ${starColor}`}>
        <FaStar />
      </h1>
    </div>
  );
  const halfStar = (
    <div>
      <h1 className={` ${starColor}`}>
        <FaStarHalfAlt />
      </h1>
    </div>
  );
  const noStar = (
    <div>
      <h1 className={` ${starColor}`}>
        <FaRegStar />
      </h1>
    </div>
  );

  return (
    <div className="flex space-x-1">
      {[...Array(max)].map((_, i) => {
        const index = i + 1;
        const type = getStarType(index);

        return (
          <div
            key={index}
            className={`relative text-[#EB5A2A] ${
              readOnly ? "" : "cursor-pointer"
            }`}
            onMouseLeave={() => setHoverRating(null)}
          >
            {!readOnly && (
              <>
                <div
                  className="absolute left-0 w-1/2 h-full z-10"
                  onMouseEnter={() => setHoverRating(index - 0.5)}
                  onClick={() => handleClick(index, true)}
                />
                <div
                  className="absolute right-0 w-1/2 h-full z-10"
                  onMouseEnter={() => setHoverRating(index)}
                  onClick={() => handleClick(index, false)}
                />
              </>
            )}
            <span className="pointer-events-none select-none">
              {type === "full" ? fullStar : type === "half" ? halfStar : noStar}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
