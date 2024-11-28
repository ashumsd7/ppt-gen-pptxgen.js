import React from "react";
import Button from "../ui/Button";
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
      <Button type="outline" disabled={isLoading} onClick={onAddChart}>
        Add Chart
      </Button>

      <Button  type="outline" disabled={isLoading} onClick={onAddImage}>
        Add Image
      </Button>
      <Button type="outline" disabled={isLoading} onClick={onAddTable}>
        Add Table
      </Button>

      {/* <button
        onClick={onSummarize}
        className={` border border-blue-600  font-medium py-2 px-4 text-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 `}
      >
      Summarize Text
      </button> */}
      <Button type="outline"  disabled={isLoading} onClick={onAddSlide}>
        Add Slide
      </Button>
      <Button type="outline" disabled={isLoading} onClick={onEditSlide}>
        Edit Slide
      </Button>
    </div>
  );
}

export default SlideControlsTest;
