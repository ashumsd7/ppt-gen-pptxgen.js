import React, { useEffect, useState } from "react";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import ProgressBar from "@uppy/progress-bar";
import { MdDeleteOutline } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
// Import Uppy styles
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/progress-bar/dist/style.css";

function FileUploader({ allowedFileTypes = ["application/pdf"] }) {
  const [uploadedFile, setUploadedFile] = useState(null);

  // Initialize Uppy instance only once
  const uppy = React.useMemo(() => {
    return new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes,
      },
      autoProceed: true, // Automatically start upload after file selection
    });
  }, [allowedFileTypes]);

  useEffect(() => {
    // Use the ProgressBar plugin only once
    if (!uppy.getPlugin("ProgressBar")) {
      uppy.use(ProgressBar, {
        target: ".uppy-progress", // Target div for the progress bar
        hideAfterFinish: false, // Keep showing progress bar after upload completes
      });
    }

    // Handle file upload completion
    uppy.on("complete", (result) => {
      if (result.successful.length > 0) {
        setUploadedFile(result.successful[0].name); // Store the uploaded file name
      }
    });

    // Cleanup Uppy instance when component unmounts
    // return () => {
    //   uppy.close();
    // };
  }, [uppy]);

  return (
    <div className=" mx-auto flex flex-col gap-4">
      {/* Uppy Dashboard */}
      <Dashboard
        uppy={uppy}
        height={190}
        hideUploadButton
        proudlyDisplayPoweredByUppy={false}
      />

    

      {/* Progress Bar */}
      <div className="uppy-progress "></div>

      {/* Display Uploaded File */}
      {uploadedFile && (
        <div className=" border p-4 -mt-4  text-gray-700 flex justify-between">
          <div>
            {/* Image and name */}
            {uploadedFile}
          </div>
          <div>
            <MdDeleteOutline className="text-xl" />
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
