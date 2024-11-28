import React, { useState } from "react";


const ImageViewer = ({ imageArray, activeSlide, setActiveSlide, controls }) => {
  const [activeIndex, setActiveIndex] = useState(0); // Active image index

  // Function to handle click on a thumbnail to update the active image
  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    setActiveSlide(index + 1);
  };

  return (
    <div className="flex h-[90vh]  gap-4   w-full">
      {/* Left side thumbnail container */}
      <div className="w-1/5 overflow-y-auto bg-white  ">
        {imageArray.length > 0 ? (
          imageArray.map((image, index) => (
            <div
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`p-4 cursor-pointer  m-2  h-[200px] ${
                activeIndex === index ? "border-l-4 border-blue-500" : ""
              }`}
            >
              <div className="flex gap-2 -ml-3">
                <span className="-mt-4">{index + 1}</span>
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-[190px] object- -mt-3 rounded shadow-lg"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="p-4 text-gray-500">No images available</p>
        )}
      </div>

      {/* Right side main image display */}
      <div className="flex-1 flex flex-col  p-8  bg-[#f7f8ff]">
        <div className="h-[56px] bg-white flex justify-center items-center shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => {
                if (activeIndex >= 1) {
                  setActiveSlide(activeIndex-1);
                  setActiveIndex(activeIndex - 1);

                }
              }}
              className={`text-gray-600 hover:text-black ${
                activeIndex === 0 && "opacity-50 cursor-not-allowed"
              }`}
              disabled={activeIndex+1 === 1}
            >
              &lt;
            </button>
            <span className="text-gray-800 font-medium">
              Slide {activeIndex+1}/{imageArray?.length}
            </span>
            <button
              onClick={() => {
                console.log('active inbdex', activeIndex)
                if (activeSlide < imageArray.length) {
                  setActiveSlide(activeIndex+1);
                  setActiveIndex(activeIndex + 1);
                }
              }}
              className={`text-gray-600 hover:text-black ${
                activeIndex+1 === imageArray.length &&
                "opacity-50 cursor-not-allowed"
              }`}
              disabled={activeIndex+1 === imageArray.length}
            >
              &gt;
            </button>
          </div>
        </div>
        {imageArray[activeIndex] ? (
          <img
            src={imageArray[activeIndex]}
            alt={`Full view ${activeIndex + 1}`}
            className="max-w-full h-[62vh] object-contain rounded shadow-lg"
          />
        ) : (
          <p className="text-gray-500">Select an image to view</p>
        )}

        {/* Control button */}
        <div className="mt-4">{controls}</div>
      </div>
    </div>
  );
};

export default ImageViewer;
