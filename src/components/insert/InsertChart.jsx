import React, { useState } from "react";
import Sidebar from "../PPT/Sidebar";
import Button from "../ui/Button";

import { RiAiGenerate } from "react-icons/ri";
import { CiCircleInfo } from "react-icons/ci";
import FileUploader from "../PPT/FileUploader";
function InsertChart({ isOpen, setIsOpen, onInsertChart }) {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [slideContent, setSlideContent] = useState("hello");
  const [tableTitle, setTableTitle] = useState("Ice Cream Flavor Sales");
  return (
    <Sidebar
      open={isOpen}
      setOpen={setIsOpen}
      title="Insert Chart"
      onConfirm={() => {
        onInsertChart();
        setIsOpen(false)
      }}
    >
      <div className="flex justify-between gap-4 mb-4">
        <Button
          type={!isContentVisible ? "solid" : "outline"}
          onClick={() => {
            setIsContentVisible(false);
          }}
          className="w-1/2"
        >
          Upload File
        </Button>
        <Button
          onClick={() => {
            setIsContentVisible(true);
          }}
          className="w-1/2"
          type={isContentVisible ? "solid" : "outline"}
        >
          Slide Content
        </Button>
      </div>
      {!isContentVisible ? (
        <div>
          <h2 className="text-base font-bold mb-4">Upload File</h2>

          <FileUploader />

          <div className="text-sm -mt-2 mb-4">Supported format: Excel, CSV</div>

          <div className="p-2 bg-gray-100 flex gap-3 items-start rounded-md text-sm">
            <CiCircleInfo className="text-xl mt-1 text-blue-500" /> A slide can
            have up to 2 media. Additional media will be added to a new slide.
          </div>
          {/* <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              Title
            </label>
            <input
              placeholder="Table Title"
              value={tableTitle}
              onChange={(e) => setTableTitle(e.target.value)}
              className=" p-2 border border-gray-300 w-[400px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-bold ">Chart Type</h2>
          {/* <textarea
            placeholder="Enter content here"
            value={slideContent}
            onChange={(e) => setSlideContent(e.target.value)}
            className="w-full h-[200px] p-2 border text-sm font-serif leading-10  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
          Selection
          <Button
            onClick={() => {
              setIsContentVisible(true);
            }}
            className=""
            type={"outline"}
          >
            <RiAiGenerate /> Generate Chart
          </Button>
          <div className="p-2 bg-gray-100 flex gap-3 items-start rounded-md text-sm">
            <CiCircleInfo className="text-xl mt-1 text-blue-500" />
            Charts generated from slide content will remain on the same slide;
            excess media moves to the next slide.
          </div>
        </div>
      )}
    </Sidebar>
  );
}

export default InsertChart;
