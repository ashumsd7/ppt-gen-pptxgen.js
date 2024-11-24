import React from "react";
// import Dropdown from "../ui/Dropdown";
const options = [
  { value: "move-table", label: "Move Table" },
  { value: "move-chart", label: "Move Chart" },
  { value: "move-image", label: "Move Image" },
];

function SlideControls({handleUploadButtonClick,handleDropdownChange}) {
  return (
    <div className="p-4 flex gap-2">
      <button
        onClick={handleUploadButtonClick}
        className={` border border-blue-600  font-medium py-2 px-4 text-blue-700 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 `}
      >
        Edit Slide
      </button>
{/* 
      <Dropdown
        options={options}
        label="Insert"
        onChange={handleDropdownChange}
      /> */}
      <button
        onClick={handleUploadButtonClick}
        className={` border border-blue-600  font-medium py-2 px-4 text-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 `}
      >
        Layout
      </button>
      <Dropdown
        options={options}
        label="Move Tables"
        onChange={handleDropdownChange}
      />
    </div>
  );
}

export default SlideControls;
