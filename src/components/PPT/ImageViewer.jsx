import React, { useState } from "react";
import SlidePagination from "./SlidePagination";

const ImageViewer = ({ imageArray, activeSlide, setActiveSlide , controls}) => {
  const [activeIndex, setActiveIndex] = useState(0); // Active image index

  // Function to handle click on a thumbnail to update the active image
  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    setActiveSlide(index + 1);
  };

  return (
    <div className="flex h-[90vh] bg-gray-100 gap-4 border  w-full">
      {/* Left side thumbnail container */}
      <div className="w-1/5 overflow-y-auto bg-white shadow-md">
        {imageArray.length > 0 ? (
          imageArray.map((image, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`p-4 cursor-pointer rounded-md m-2  h-[200px] ${
                activeIndex === index ? "bg-gray-200" : "bg-white"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-[190px] object- -mt-3 rounded"
              />
            </div>
          ))
        ) : (
          <p className="p-4 text-gray-500">No images available</p>
        )}
      </div>

      {/* Right side main image display */}
      <div className="flex-1 flex flex-col  p-4  bg-gray-200">
        {imageArray[activeIndex] ? (
          <img
            src={imageArray[activeIndex]}
            alt={`Full view ${activeIndex + 1}`}
            className="max-w-full h-[78vh] object-cover rounded shadow-lg"
          />
        ) : (
          <p className="text-gray-500">Select an image to view</p>
        )}

        {/* Control button */}
        <div className="mt-4">
         {controls}
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
