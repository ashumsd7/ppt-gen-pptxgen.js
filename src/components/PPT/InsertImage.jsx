import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Button from "../ui/Button";
import FileUploader from "./FileUploader";
import { RiAiGenerate } from "react-icons/ri";
import { CiCircleInfo } from "react-icons/ci";
function InsertImage({ isInsertTableOpen, setIsInsertTableOpen }) {
  const [isUploaded, setIsUploaded] = useState(false);
  return (
    <Sidebar
      open={isInsertTableOpen}
      setOpen={setIsInsertTableOpen}
      title="Insert Image"
    >
      {!isUploaded ? (
        <div>
          <h2 className="text-base font-bold mb-4">Upload Image</h2>

          <FileUploader />
          <div className="text-sm -mt-6 mb-4  ">Supported format: PNG , JPEG</div>
        </div>
      ) : (
        <div className="flex flex-col gap-2"></div>
      )}
      <div className="p-2 bg-gray-100 flex gap-3 items-center rounded-md text-sm mt-2">
        <CiCircleInfo className="text-3xl mt-1 text-blue-500" /> A slide can have
        up to 2 media. Additional media will be added to a new slide.
      </div>
    </Sidebar>
  );
}

export default InsertImage;