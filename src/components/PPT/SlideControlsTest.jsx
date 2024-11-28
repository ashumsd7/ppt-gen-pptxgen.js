import React from "react";
// import Dropdown from "../ui/Dropdown";
const options = [
  { value: "move-table", label: "Move Table" },
  { value: "move-chart", label: "Move Chart" },
  { value: "move-image", label: "Move Image" },
];

function SlideControlsTest({
  onAddChart,
  onAddTable,
  onAddImage,
  onSummarize,
  onAddSlide,
  onEditSlide,
  isLoading,
}) {
  return (
    <div className="py-4 flex gap-2">
      <button
        disabled={isLoading}
        onClick={onAddChart}
        className={` border border-blue-600  font-medium py-2 px-4 text-blue-700 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 `}
      >
        Add Chart
      </button>

      <button
        disabled={isLoading}
        onClick={onAddImage}
        className={` border border-blue-600  font-medium py-2 px-4 text-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 `}
      >
        Add Image
      </button>
      <button
        disabled={isLoading}
        onClick={onAddTable}
        className={` border border-blue-600  font-medium py-2 px-4 text-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 `}
      >
        Add Table
      </button>

      {/* <button
        onClick={onSummarize}
        className={` border border-blue-600  font-medium py-2 px-4 text-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 `}
      >
      Summarize Text
      </button> */}
      <button
        disabled={isLoading}
        onClick={onAddSlide}
        className={` border border-blue-600  font-medium py-2 px-4 text-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 `}
      >
        Add Slide
      </button>
      <button
        disabled={isLoading}
        onClick={onEditSlide}
        className={` border border-blue-600  font-medium py-2 px-4 text-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 `}
      >
        Edit Slide
      </button>
    </div>
  );
}

export default SlideControlsTest;
