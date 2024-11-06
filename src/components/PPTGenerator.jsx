import React, { useEffect, useState } from "react";

import pptxgen from "pptxgenjs";
import { BlobServiceClient } from "@azure/storage-blob";
import { DocumentViewer } from "react-documents";

// Tab data
const tabs = [
  { label: "Text", value: "text" },
  { label: "Image", value: "image" },
  { label: "Chart", value: "chart" },
  { label: "Table", value: "table" },
];
function PPTGen() {
  // State for toggling between "Generate PPT" and "Show List"
  const [view, setView] = useState("generate");
  const [blobList, setBlobList] = useState([]);
  const [slideMode, setSlideMode] = useState("text");
  const [slideName, setSlideName] = useState(`PPT-${slideMode}-${blobList.length + 1}`);
  const [imageURL, setImageURL] = useState(
    "https://media.istockphoto.com/id/1241682184/photo/bird-on-top-of-a-stick.jpg?s=2048x2048&w=is&k=20&c=kFLLe-NPodHtMIlvHbtNMNXUfTJyddny_BMpGY9diFE="
  );

  const ppt_object = {
    text: {
      content: "Hey I am PPT Generator!",
      options: {
        x: 1,
        y: 1,
        w: 10,
        fontSize: 36,
        fill: { color: "F1F1F1" },
        align: "center",
      },
    },
    image: {
      content: imageURL,
      options: {
        x: 1,
        y: 2,
        w: 3,
        h: 2,
      },
    },
    chart: {
      content: [
        {
          name: "Actual Sales",
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          values: [
            1500, 4600, 5156, 3167, 8510, 8009, 6006, 7855, 12102, 12789, 10123,
            15121,
          ],
        },
        {
          name: "Projected Sales",
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          values: [
            1000, 2600, 3456, 4567, 5010, 6009, 7006, 8855, 9102, 10789, 11123,
            12121,
          ],
        },
      ],
      options: { x: 1, y: 1, w: 8, h: 4 },
    },
    table: {
      content: [
        [
          { text: "Top Lft", options: { align: "left", fontFace: "Arial" } },
          {
            text: "Top Ctr",
            options: { align: "center", fontFace: "Verdana" },
          },
          { text: "Top Rgt", options: { align: "right", fontFace: "Courier" } },
        ],
      ],
      options: { w: 9, rowH: 1, align: "left", fontFace: "Arial" },
    },
  };

  useEffect(() => {
    console.log(ppt_object[slideMode]);
    setPptContent(ppt_object[slideMode].content);
    setPptOptions(ppt_object[slideMode].options);
  }, [slideMode]);

  useEffect(() => {
    
    setSlideName(`PPT-${slideMode}-${blobList.length + 1}`)
  }, [slideMode]);

  const handleInputChange = (e) => {
    setSlideName(e.target.value);
  };
  const sasToken =
    "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-06-04T13:26:22Z&st=2024-11-05T05:26:22Z&spr=https,http&sig=pAcLQDyT%2BRNtUABOSobtIhb%2FuSA43rbiU0btYf%2FVttw%3D";
  const containerName = `cmpptgencontainerv1`;
  const storageAccountName = "codemonkpptgen";
  // State to store text input for generating PPT
  // State to store generated PPT data
  const [pptData, setPptData] = useState(null);

  const [latestBlob, setLatestBlob] = useState(
    "https://testingfeatures.blob.core.windows.net/test/POC%20(1).pptx?sp=r&st=2024-10-25T06:18:48Z&se=2024-11-25T14:18:48Z&spr=https&sv=2022-11-02&sr=b&sig=NtLNYZO3tUTV9IhjnKJIKv2d7ePXcEHnQd%2F02IXvQlg%3D"
  );
  const [pptContent, setPptContent] = useState("");
  const [pptOptions, setPptOptions] = useState("");
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
    setSlideName(`PPT-${slideMode}-${returnedBlobUrls?.length + 1}`);
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
      setView("list");

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
    // const pptContent = window.prompt("Enter content for the PPT:");

    // Create a new PowerPoint presentation
    let pptx = new pptxgen();
    let slide = pptx.addSlide();



    console.log("slideMode", slideMode);
    console.log("ppt", pptContent);
    console.log("pptOptions", pptOptions);

    if (slideMode == "text") {
      slide.background = { color: "E0F7FA" }
      slide.addText(pptContent, pptOptions);
    }

    if (slideMode == "image") {
      slide.background = { color: "FFF9C4" };
      slide.addImage({
        path: imageURL,
        ...pptOptions,
      });
    }

    if (slideMode == "chart") {
      slide.background = { color: "E1F5FE" };
      slide.addChart(pptx.ChartType.line, pptContent, pptOptions);
    }

    if (slideMode == "table") {
      slide.background = { color: "FCE4EC" };
      slide.addTable(pptContent, pptOptions);
    }

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
      const res = await uploadFileToBlob2(pptBlob, `${slideName}.pptx`);
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
    generateAndUploadPPT();
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
          <nav className="mb-6 flex space-x-4 border-b pb-2">
            <span
              className={`cursor-pointer px-3 py-2 rounded transition ${
                view === "generate"
                  ? "font-semibold text-white bg-gray-800 border-b-2 border-blue-500"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
              onClick={() => setView("generate")}
            >
              Generate PPT
            </span>
            <span
              className={`cursor-pointer px-3 py-2 rounded transition ${
                view === "list"
                  ? "font-semibold text-white bg-gray-800 border-b-2 border-blue-500"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
              onClick={() => setView("list")}
            >
              Show List
            </span>
          </nav>

          {/* Conditional Rendering based on selected view */}
          {view === "generate" && (
            <div>
              <div className="flex space-x-4 bg-gray-100 p-4 rounded-lg mb-2">
                {tabs.map((tab) => (
                  <div
                    key={tab.value}
                    onClick={() => setSlideMode(tab.value)}
                    className={`cursor-pointer px-4 py-2 rounded ${
                      slideMode === tab.value
                        ? "bg-blue-500 text-white font-semibold"
                        : "bg-white text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-start space-y-2  bg-gray-100 rounded-lg shadow-md w-full mb-2">
                <label
                  htmlFor="slideName"
                  className="text-sm font-semibold text-gray-700"
                >
                  Enter Slide Name:
                </label>
                <input
                  type="text"
                  id="slideName"
                  value={slideName}
                  onChange={handleInputChange}
                  placeholder="Type slide name here..."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {slideMode !== "image" ? (
                <div>
                  <label
                    htmlFor="slideName"
                    className="text-sm font-semibold text-gray-700"
                  >
                    {`Enter PPT ${slideMode.toUpperCase()} Content here`}
                  </label>
                  <textarea
                    placeholder="Enter PPT Gen syntax here"
                    value={
                      typeof pptContent === "object"
                        ? JSON.stringify(pptContent, null, 2)
                        : pptContent
                    }
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      // setInputValue(inputValue); // Update textarea with user's changes

                      try {
                        const parsedContent =
                          typeof inputValue === "object"
                            ? JSON.parse(inputValue)
                            : inputValue; // Try to parse the JSON string
                        setPptContent(parsedContent); // Update pptContent if parsing is successful
                      } catch (error) {
                        console.error("Invalid JSON format", error);
                        // Optionally, show a warning message to the user about invalid JSON
                      }
                    }}
                    className="w-full h-[20vh] p-2  border border-gray-300 rounded mb-2"
                  />
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="slideName"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Enter Image URL:
                  </label>
                  <div className="flex gap-2 items-center mb-2">
                    <input
                      type="text"
                      id="imageURL"
                      value={imageURL}
                      onChange={(e) => {
                        setImageURL(e.target.value);
                      }}
                      placeholder="Paste Image path"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2  focus:ring-blue-500"
                    />
                    <img src={imageURL} className="w-10 h-10 rounded-md" />
                  </div>
                </div>
              )}
              <label
                htmlFor="slideName"
                className="text-sm font-semibold text-gray-700"
              >
                {`Enter PPT ${slideMode.toUpperCase()} options here`}
              </label>
              <textarea
                placeholder="Enter PPT Gen Options here"
                value={
                  typeof pptOptions === "object"
                    ? JSON.stringify(pptOptions, null, 2)
                    : pptOptions
                }
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // setInputValue(inputValue); // Update textarea with user's changes

                  try {
                    const parsedContent =
                      typeof inputValue === "object"
                        ? JSON.parse(inputValue)
                        : inputValue; // Try to parse the JSON string
                    setPptContent(pptOptions); // Update pptContent if parsing is successful
                  } catch (error) {
                    console.error("Invalid JSON format", error);
                    // Optionally, show a warning message to the user about invalid JSON
                  }
                }}
                className="w-full h-[20vh] p-2 mb-4 border border-gray-300 rounded"
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
          {latestBlob && view !== "generate" ? (
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
            <p className="text-gray-500">
              {view == "generate"
                ? "No Preview in edit mode"
                : "No PPT content generated yet."}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default PPTGen;
