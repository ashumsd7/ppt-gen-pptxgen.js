import React, { useState } from "react";
import Sidebar from "../PPT/Sidebar";
import Button from "../ui/Button";

import { RiAiGenerate } from "react-icons/ri";
import { CiCircleInfo } from "react-icons/ci";
import FileUploader from "../PPT/FileUploader";
import { MdOutlineInsertChart } from "react-icons/md";
import { LuBarChart3 } from "react-icons/lu";
function InsertChart({ isOpen, setIsOpen, onInsertChart }) {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [slideContent, setSlideContent] = useState("hello");
  const [tableTitle, setTableTitle] = useState("Ice Cream Flavor Sales");
  const [chartType, setChartType] = useState("bar");
  return (
    <Sidebar
      open={isOpen}
      setOpen={setIsOpen}
      title="Insert Chart"
      onConfirm={() => {
        onInsertChart();
        setIsOpen(false);
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
        <div className="">
          <h2 className="text-base font-bold mb-4">Upload File</h2>

          <FileUploader />

          <div className="text-sm -mt-2 mb-4">Supported format: Excel, CSV</div>

          <div className="p-2 bg-gray-100 flex gap-3 items-center rounded-md text-sm">
            <CiCircleInfo className="text-xl  text-blue-500" /> A slide can have
            up to 2 media. Additional media will be added to a new slide.
          </div>
          <h2 className="text-base font-bold my-4 ">Chart Type</h2>

          <div className="flex gap-2 mb-4">
            <div
              onClick={() => {
                setChartType("bar");
              }}
              className={`w-1/2 h-16 border  flex flex-col gap-1 cursor-pointer items-center justify-center shadow-sm rounded-md ${
                chartType == "bar" && "bg-[#e6eaff]"
              }`}
            >
              <LuBarChart3 className="text-2xl" />
              <span>Bar Chart</span>
            </div>
            <div
              onClick={() => {
                setChartType("line");
              }}
              className={`w-1/2 h-16 border  flex flex-col gap-1 cursor-pointer items-center justify-center shadow-sm rounded-md ${
                chartType == "line" && "bg-[#e6eaff]"
              }`}
            >
              <MdOutlineInsertChart className="text-2xl" />
              <span>Line Chart</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <textarea
            placeholder="Enter content here"
            value={slideContent}
            onChange={(e) => setSlideContent(e.target.value)}
            className="w-full h-[200px] p-2 border text-sm font-serif leading-10  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <div className="w-full my-4">
        <Button
          className="w-full"
          onClick={() => {
            setIsContentVisible(true);
          }}
          type={"outline"}
        >
          <RiAiGenerate /> Generate Chart
        </Button>

        {isContentVisible && (
          <div className="p-2 my-4 bg-gray-100 flex gap-3 items-start rounded-md text-sm">
            <CiCircleInfo className="text-xl mt-1 text-blue-500" />
            Charts generated from slide content will remain on the same slide;
            excess media moves to the next slide.
          </div>
        )}
      </div>
    </Sidebar>
  );
}

export default InsertChart;
