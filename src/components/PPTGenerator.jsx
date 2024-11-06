import React, { useEffect, useState } from "react";

import pptxgen from "pptxgenjs";
import { BlobServiceClient } from "@azure/storage-blob";
import { DocumentViewer } from "react-documents";
function PPTGen() {
  // State for toggling between "Generate PPT" and "Show List"
  const [view, setView] = useState("generate");

  const sasToken =
    "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-06-04T13:26:22Z&st=2024-11-05T05:26:22Z&spr=https,http&sig=pAcLQDyT%2BRNtUABOSobtIhb%2FuSA43rbiU0btYf%2FVttw%3D";
  const containerName = `cmpptgencontainerv1`;
  const storageAccountName = "codemonkpptgen";
  // State to store text input for generating PPT

  // State to store generated PPT data
  const [pptData, setPptData] = useState(null);

  const [blobList, setBlobList] = useState([]);
  const [latestBlob, setLatestBlob] = useState(
    "https://testingfeatures.blob.core.windows.net/test/POC%20(1).pptx?sp=r&st=2024-10-25T06:18:48Z&se=2024-11-25T14:18:48Z&spr=https&sv=2022-11-02&sr=b&sig=NtLNYZO3tUTV9IhjnKJIKv2d7ePXcEHnQd%2F02IXvQlg%3D"
  );
  const [pptContent, setPptContent] = useState("");
  let pptx = new pptxgen();

  const getBlobsInContainer = async (containerClient) => {
    const returnedBlobUrls = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      // if image is public, just construct URL
      returnedBlobUrls.push(
        `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
      );
    }
    console.log("returnedBlobUrls", returnedBlobUrls);
    setBlobList(returnedBlobUrls);
    return returnedBlobUrls;
  };

  async function uploadFileToBlob2(fileBlob, fileName) {
    console.log("file name 12", fileName);

    try {
      // Create a BlobServiceClient
      const blobServiceClient = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
      );

      // Get a container client
      const containerClient =
        blobServiceClient.getContainerClient(containerName);

      // Create a block blob client for the file
      const blockBlobClient = containerClient.getBlockBlobClient(fileName);

      // Upload the Blob
      await blockBlobClient.uploadBrowserData(fileBlob, {
        blobHTTPHeaders: { blobContentType: fileBlob.type },
      });

      alert("PPT uploaded successfully!");

      const fileUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${fileName}`;
      console.log("File URL:", fileUrl);
      return fileUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
  }

  // Function to generate the PPT and upload to Azure Blob Storage
  async function generateAndUploadPPT() {
    const pptContent = window.prompt("Enter content for the PPT:");

    // Create a new PowerPoint presentation
    let pptx = new pptxgen();
    let slide = pptx.addSlide();
    slide.addText(
      `Codemonk PPT Generator! Number :  ${
        blobList.length + 1
      } Text is : ${pptContent} `,
      {
        x: 1,
        y: 1,
        w: 10,
        fontSize: 36,
        fill: { color: "F1F1F1" },
        align: "center",
      }
    );

    console.log("came hgere");
    // Generate the PPT file as a Blob
    pptx.write("base64").then(async (base64String) => {
      console.log("base64String", base64String);
      // Convert base64 to a Blob
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const pptBlob = new Blob([byteArray], {
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      });

      // Upload the Blob to Azure Blob Storage
      const res = await uploadFileToBlob2(
        pptBlob,
        `PPT-${blobList.length + 1}.pptx`
      );
      console.log("res", res);
      setLatestBlob(res);

      console.log("File Uploaded");
      const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
      );
      const containerClient = blobService.getContainerClient(containerName);

      // get list of blobs in container
      return getBlobsInContainer(containerClient);
    });
  }

  useEffect(() => {
    const blobService = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );
    const containerClient = blobService.getContainerClient(containerName);

    getBlobsInContainer(containerClient);
    return () => {};
  }, []);

  // Handle form submission for generating PPT
  const handleGeneratePPT = () => {
    // setPptData(pptContent); // Replace with actual logic to generate PPT
    // onClick = { generateAndUploadPPT };
    generateAndUploadPPT()
  };

  return (
    <>
      <div className="bg-gray-200 h-[78px] flex justify-start items-center">
        <h1 className="text-3xl px-4 font-bold py-2">PPT GEN</h1>
      </div>
      <div className="flex h-[90vh] bg-gray-100">
        {/* Left Side: Navigation and Content Input */}
        <div className="w-1/3 p-6 border-r border-gray-300 bg-white">
          {/* Navbar */}
          <nav className="mb-6 flex space-x-4 ">
            <span
              className={`cursor-pointer ${
                view === "generate"
                  ? "font-bold underline bg-gray-800 text-white px-2 py-1 rounded-md"
                  : ""
              }`}
              onClick={() => setView("generate")}
            >
              Generate PPT
            </span>
            <span
              className={`cursor-pointer ${
                view === "list"
                  ? "font-bold underline bg-gray-800 text-white px-2 py-1 rounded-md"
                  : ""
              }`}
              onClick={() => setView("list")}
            >
              Show List
            </span>
          </nav>

          {/* Conditional Rendering based on selected view */}
          {view === "generate" && (
            <div>
              <textarea
                placeholder="Enter PPT Gen syntax here"
                value={pptContent}
                onChange={(e) => setPptContent(e.target.value)}
                className="w-full h-40 p-2 mb-4 border border-gray-300 rounded"
              />
              <button
                onClick={handleGeneratePPT}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
              >
                Generate PPT
              </button>
            </div>
          )}

          {view === "list" && (
            <div className="space-y-2">
              {blobList.map((blob, index) => (
                <div
                  onClick={() => setLatestBlob(blob)}
                  key={index}
                  className={`flex items-center p-3 border rounded-lg shadow-sm cursor-pointer transition duration-200 ease-in-out 
        ${
          blob === latestBlob
            ? "bg-blue-100 border-blue-500"
            : "bg-white border-gray-200 hover:bg-gray-100"
        }`}
                >
                  {/* Index Number */}
                  <span className="text-sm font-semibold text-gray-500 mr-2">
                    {index + 1}.
                  </span>

                  {/* Blob Name */}
                  <span className="text-sm text-gray-800 truncate">
                    {blob.split("/").slice(-1)[0]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: PPT Viewer */}
        <div className="w-2/3 p-6 bg-gray-50">
          {latestBlob ? (
            <div style={{ marginTop: "20px", padding: "10px", width: "100%" }}>
              <DocumentViewer
                style={{ height: "60vh", width: "100%" }}
                queryParams="hl=NL"
                url={latestBlob}
                viewerUrl={latestBlob}
                viewer="office"
                overrideLocalhost="https://react-doc-viewer.firebaseapp.com/"
              />
            </div> // Replace with actual rendering logic for PPT
          ) : (
            <p className="text-gray-500">No PPT content generated yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default PPTGen;
