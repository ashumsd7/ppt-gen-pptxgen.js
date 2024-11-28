import React from "react";

function SlidePagination({activeSlide,setActiveSlide,slidesConfig,setActiveIndex}) {
  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={() => {
          if (activeSlide > 1) {
            setActiveSlide(activeSlide - 1);
            setActiveIndex(activeSlide-1)
          }
        }}
        className={`text-gray-600 hover:text-black ${
          activeSlide === 1 && "opacity-50 cursor-not-allowed"
        }`}
        disabled={activeSlide === 1}
      >
        &lt;
      </button>
      <span className="text-gray-800 font-medium">
        Slide {activeSlide}/{slidesConfig?.length}
      </span>
      <button
        onClick={() => {
          if (activeSlide < slidesConfig.length) {
            setActiveSlide(activeSlide + 1);
            setActiveIndex(activeSlide)
          }
        }}
        className={`text-gray-600 hover:text-black ${
          activeSlide === slidesConfig.length && "opacity-50 cursor-not-allowed"
        }`}
        disabled={activeSlide === slidesConfig.length}
      >
        &gt;
      </button>
    </div>
  );
}

export default SlidePagination;
