import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi"; // Example icon, you can choose any

function HoverButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsClicked(false)
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        // onClick={handleClick}
        className={`flex items-center justify-center w-12 h-12 p-2 rounded-full bg-yellow-500 text-black transition-all duration-300 ${
          isHovered || isClicked ? "w-36" : "w-12"
        }`}
      >
        {isHovered || isClicked ? (
          <span className="whitespace-nowrap">Get Started</span>
        ) : (
          <FiArrowRight className="text-xl" />
        )}
      </button>
    </div>
  );
}

export default HoverButton;
