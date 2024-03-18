import React from "react";

const ColorRingSpinner = ({ visible, height, width, ariaLabel, wrapperStyle, wrapperClass, colors }) => {
  return (
    <div
      className={wrapperClass}
      style={{
        display: visible ? "block" : "none",
        width: width + "px",
        height: height + "px",
        position: "relative",
        ...wrapperStyle
      }}
    >
      <svg
        className="color-ring-spinner"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={ariaLabel}
      >
        {colors.map((color, index) => (
          <circle
            key={index}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray="141.37"
            strokeDashoffset={(141.37 * index) / colors.length}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        ))}
      </svg>
    </div>
  );
};

export default ColorRingSpinner;
