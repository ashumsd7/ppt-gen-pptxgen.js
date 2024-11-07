import React, { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi"; // Example icon, you can choose any
let isOnButton=false
function HoverButtonV2() {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [isOnButton, setIsOnButton] = useState(false);

  useEffect(() => {
    let timer;
    if (isExpanded) {
      // Set a timer to collapse the button after 3 seconds of inactivity
      timer = setInterval(() => {
        console.log("isOnButton",isOnButton);
        if(!isOnButton)
        setIsExpanded(false);
      }, 3000);
    }
    return () => clearTimeout(timer); // Clear the timer if the button state changes or component unmounts
  }, [isExpanded]);

  const handleMouseEnter = () => {
    console.log('entered')
    isOnButton=true
    setIsExpanded(true); // Expand the button on hover
  };

  const handleClick = () => {
    setIsExpanded(true); // Expand the button on click
  };

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        onMouseLeave={() => {
          console.log('Left2')
          // setIsOnButton(false);
          isOnButton=false
          // setIsExpanded(false);
        }}
        className={`flex items-center justify-center w-12 h-12 p-2 rounded-full bg-yellow-500 text-black transition-all duration-300 ${
          isExpanded ? "w-36" : "w-12"
        }`}
      >
        {isExpanded ? (
          <span className="whitespace-nowrap">Get Started</span>
        ) : (
          <FiArrowRight className="text-xl" />
        )}
      </button>
    </div>
  );
}

export default HoverButtonV2;
