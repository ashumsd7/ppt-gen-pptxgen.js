import React, { useEffect, useState } from "react";

import pptxgen from "pptxgenjs";
import { BlobServiceClient } from "@azure/storage-blob";
import { DocumentViewer } from "react-documents";
import HoverButton from "./HoverButton";
import HoverButtonV2 from "./HoverButtoonv2";
import { Draggable } from "react-drag-reorder";

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
  const [isControlEnabled, setIsControlEnabled] = useState(true);
  const [selectedChartType, setSelectedChartType] = useState("area");
  const [slideName, setSlideName] = useState(
    `Slide_${
      slideMode === "chart" ? `${slideMode}_${selectedChartType}_` : slideMode
    }_${blobList.length + 1}`
  );
  const [selectedTemplate, setSelectedTemplate] = useState({
    id: 0,
    name: "Blank Template",
  });

  const templates = [
    { id: 0, name: "Blank Template" }, // Default template
    { id: 1, name: "Template 1" },
    { id: 2, name: "Template 2" },
    { id: 3, name: "Template 3" },
    { id: 4, name: "Template 4" },
  ];

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
  };
  const [imageURL, setImageURL] = useState(
    "https://media.istockphoto.com/id/1241682184/photo/bird-on-top-of-a-stick.jpg?s=2048x2048&w=is&k=20&c=kFLLe-NPodHtMIlvHbtNMNXUfTJyddny_BMpGY9diFE="
  );
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSelectionChange = (e) => {
    setSelectedChartType(e.target.value);
    console.log(`Selected chart type: ${e.target.value}`);
  };

  const chartOptions = [
    { label: "Area", value: "area" },
    { label: "Bar", value: "bar" },
    { label: "Bar 3D", value: "bar3d" },
    // { label: "Bubble", value: "bubble" },
    // { label: "Bubble 3D", value: "bubble3d" },
    { label: "Doughnut", value: "doughnut" },
    { label: "Line", value: "line" },
    { label: "Pie", value: "pie" },
    { label: "Radar", value: "radar" },
    { label: "Scatter", value: "scatter" },
  ];
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
        [
          { text: "Mid Lft", options: { align: "left", fontFace: "Arial" } },
          {
            text: "Mid Ctr",
            options: { align: "center", fontFace: "Verdana" },
          },
          { text: "Mid Rgt", options: { align: "right", fontFace: "Courier" } },
        ],
      ],
      options: {
        w: 9,
        rowH: 1,
        align: "left",
        fontFace: "Arial",
        border: { pt: 1, color: "000000" }, // Apply border to all cells
      },
    },
  };

  useEffect(() => {
    console.log(ppt_object[slideMode]);
    setPptContent(ppt_object[slideMode].content);
    setPptOptions(ppt_object[slideMode].options);
  }, [slideMode]);

  useEffect(() => {
    setSlideName(
      `Slide_${
        slideMode === "chart" ? `${slideMode}_${selectedChartType}_` : slideMode
      }_${blobList.length + 1}`
    );
  }, [slideMode]);

  const toggleControl = () => {
    setIsControlEnabled((prev) => !prev);
  };

  useEffect(() => {
    const controlElement = document.querySelector(
      ".cui-toolbar-buttondock.alignright"
    );
    console.log("controlElement", controlElement);

    if (controlElement) {
      if (isControlEnabled) {
        controlElement.setAttribute("aria-disabled", "false");
        controlElement.style.opacity = "1";
        controlElement.style.pointerEvents = "auto"; // Enable interactions
      } else {
        controlElement.setAttribute("aria-disabled", "true");
        controlElement.style.opacity = "0.5";
        controlElement.style.pointerEvents = "none"; // Disable interactions
      }
    }
  }, [isControlEnabled]);

  const sasToken =
    "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-06-04T13:26:22Z&st=2024-11-05T05:26:22Z&spr=https,http&sig=pAcLQDyT%2BRNtUABOSobtIhb%2FuSA43rbiU0btYf%2FVttw%3D";
  const containerName = `cmpptgencontainerv1`;
  const storageAccountName = "codemonkpptgen";

  const [latestBlob, setLatestBlob] = useState(
    "https://testingfeatures.blob.core.windows.net/test/POC%20(1).pptx?sp=r&st=2024-10-25T06:18:48Z&se=2024-11-25T14:18:48Z&spr=https&sv=2022-11-02&sr=b&sig=NtLNYZO3tUTV9IhjnKJIKv2d7ePXcEHnQd%2F02IXvQlg%3D"
  );
  const [pptContent, setPptContent] = useState("");
  const [pptOptions, setPptOptions] = useState("");
  const [lastSlides, setLastSlides] = useState([]);
  const getBlobsInContainer = async (containerClient) => {
    const returnedBlobUrls = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      // if image is public, just construct URL
      returnedBlobUrls.push(
        `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
      );
    }

    setBlobList(returnedBlobUrls);
    setSlideName(
      `Slide_${
        slideMode === "chart" ? `${slideMode}_${selectedChartType}_` : slideMode
      }_${blobList.length + 1}`
    );
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

      alert("PPT updated successfully!");
      // setView("list");

      const fileUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${fileName}`;
      console.log("File URL:", fileUrl);
      return fileUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
  }
  let pptx = new pptxgen();
  // Function to generate the PPT and upload to Azure Blob Storage
  async function generateAndUploadPPT(prevSlidesData = lastSlides, reordered) {
    console.log("slideMode", slideMode);
    console.log("ppt", pptContent);
    console.log("pptOptions", pptOptions);
    console.log("lastSlides", prevSlidesData);
    console.log("lastSlides length", prevSlidesData.length);

    // let pptx = new pptxgen();
    // let slide = pptx.addSlide();
    // let slide2 = pptx.addSlide();

    // console.log(pptContent);
    // console.log(pptOptions);

    // slide.addChart(pptx.ChartType.pie, [...pptContent], { ...pptOptions });
    // slide2.addChart(pptx.ChartType.bar, [...pptContent], { ...pptOptions });

    const newSlideData = {
      order: prevSlidesData.length,
      name: slideName,
      pptContent: pptContent,
      pptOptions: pptOptions,
      type: slideMode,
      path: imageURL,
      chartType: selectedChartType,
    };

    console.log("old prevSlidesData", prevSlidesData);
    const newArr = reordered
      ? prevSlidesData
      : [...prevSlidesData, newSlideData];
    console.log("new prevSlidesData", newArr);

    setLastSlides(newArr);

    newArr.forEach((slideData) => {
      let slide = pptx.addSlide();

      // Set background color and add content based on type
      if (slideData.type === "text") {
        slide.background = { color: "E0F7FA" };
        slide.addText(slideData.pptContent, slideData.pptOptions);
      } else if (slideData.type === "image") {
        slide.background = { color: "FFF9C4" };
        slide.addImage({
          path: slideData.path,
          ...slideData.pptOptions,
        });
      } else if (slideData.type === "chart") {
        slide.background = { color: "E1F5FE" };
        console.log("Adding existing chart type:", slideData.chartType);
        // Use the stored `chartType` from `slideData`
        slide.addChart(
          pptx.ChartType[slideData.chartType],
          [...slideData.pptContent],
          { ...slideData.pptOptions }
        );
      } else if (slideData.type === "table") {
        slide.background = { color: "FCE4EC" };
        slide.addTable([...slideData.pptContent], { ...slideData.pptOptions });
      }
    });

    // Convert PPT to Blob and upload
    pptx.write("base64").then(async (base64String) => {
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
        `${
          isChecked ? "Final-" : reordered ? "Reordered=" : ""
        }${slideName}.pptx`
      );
      console.log("res", res);
      setLatestBlob(res);
      console.log("File Uploaded");

      const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
      );
      const containerClient = blobService.getContainerClient(containerName);
      setIsChecked(false);
      return getBlobsInContainer(containerClient);
    });
  }

  function getTime() {
    const now = new Date();
    const formattedString =
      `${now.getDate().toString().padStart(2, "0")}_` +
      `${(now.getMonth() + 1).toString().padStart(2, "0")}_` +
      `${now.getFullYear()}_` +
      `${now.getHours().toString().padStart(2, "0")}_` +
      `${now.getMinutes().toString().padStart(2, "0")}_` +
      `${now.getSeconds().toString().padStart(2, "0")}`;

    console.log(formattedString);
    return formattedString;
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
    <div className="relative min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-800 h-[78px] flex items-center shadow-lg">
        <h1 className="text-3xl font-bold px-6 text-white">PPT Generator</h1>
      </header>

      <div className="flex h-[90vh]">
        {/* Left Sidebar - Navigation and Content Input */}
        <aside className="w-1/3 p-6 bg-white border-r border-gray-300 shadow-md">
          {/* Tabs for Slide Type Selection */}
          <div className="flex space-x-4 mb-6 bg-gray-100 p-4 rounded-lg shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSlideMode(tab.value)}
                className={`px-4 py-2 rounded-md transition-all duration-150 ${
                  slideMode === tab.value
                    ? "bg-blue-600 text-white font-semibold shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Conditional Content based on Slide Mode */}
          {slideMode === "chart" && (
            <div className="space-y-4 mb-4">
              <label className="font-semibold text-gray-700">
                Select Chart Type
              </label>
              <select
                value={selectedChartType}
                onChange={handleSelectionChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {chartOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Content Input Section */}
          {slideMode !== "image" ? (
            <div className="mb-6 hidden">
              <label className="text-sm font-semibold text-gray-700 mb-1 block">
                Enter PPT {slideMode.toUpperCase()} Content
              </label>
              <textarea
                placeholder="Enter content here"
                value={pptContent}
                onChange={(e) => handleContentChange(e)}
                className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ) : (
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 mb-1 block">
                Enter Image URL
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Paste Image URL"
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {imageURL && (
                  <img
                    src={imageURL}
                    alt="Image preview"
                    className="w-12 h-12 rounded-md shadow"
                  />
                )}
              </div>
            </div>
          )}

          <button
            onClick={handleGeneratePPT}
            className="w-full px-4 py-2 mt-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-150 shadow-md"
          >
            Add {slideMode.toLowerCase()} Slide
          </button>

          {lastSlides.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-1 flex gap-2 items-center">
                Reorder Slides{" "}
                <p className="font-light text-sm">({lastSlides.length})</p>
              </h2>
              {lastSlides.length <= 1 ? (
                <p className="mb-1 text-gray-500 text-left">
                  Add at least two slides to enable reordering.
                </p>
              ) : (
                <p className="mb-1 text-gray-500 text-left">
                  Now you can drag and reorder slides
                </p>
              )}
              <div className="flex flex-wrap gap-4 p-4 border-dashed border-2 border-gray-300 rounded-lg bg-white shadow-sm">
                <Draggable
                  key={lastSlides.length}
                  onPosChange={(currentPos, newPos) => {
                    console.log(`Moved from ${currentPos} to ${newPos}`);
                    if (newPos == currentPos) return;

                    // Clone lastSlides to avoid mutating the original array directly
                    const reorderedSlides = [...lastSlides];

                    // Remove the slide at the current position
                    const [movedSlide] = reorderedSlides.splice(currentPos, 1);

                    // Insert the slide at the new position
                    reorderedSlides.splice(newPos, 0, movedSlide);

                    // Update the order for each slide based on the new arrangement
                    const updatedSlides = reorderedSlides.map(
                      (slide, index) => ({
                        ...slide,
                        order: index,
                      })
                    );
                    console.log("updatedSlides", updatedSlides);

                    // Update the state with the newly ordered slides
                    setLastSlides(updatedSlides);
                    generateAndUploadPPT(updatedSlides, true);
                  }}
                  dragItemStyling={{ cursor: "grab" }}
                >
                  {lastSlides.map((slide, index) => (
                    <div
                      key={index}
                      className="w-24 h-24 flex flex-col items-center bg-gray-200 rounded-lg shadow-lg transition-all duration-150"
                    >
                      <div className="w-full h-20 bg-gray-300 rounded-t-lg flex items-center justify-center">
                        <h1 className="text-2xl font-bold text-black">
                          {slide.order}
                        </h1>
                      </div>
                      <p className="text-center text-xs px-1 font-light truncate w-24 text-gray-700 mt-1">
                        {slide.name}
                      </p>
                    </div>
                  ))}
                </Draggable>
              </div>
            </section>
          ) : (
            <></>
          )}
        </aside>

        {/* Main Content - PPT Viewer and Reorder Section */}
        <main className="w-2/3 p-6 bg-gray-100">
          <div className="bg-yellow-100 p-4 rounded-md text-center mb-6">
            <p className="text-gray-700 font-semibold">
              This is a Proof of Concept (POC) to demonstrate the feasibility of
              the product.
            </p>
          </div>
          <div>
            {/* <button onClick={toggleControl}>
        {isControlEnabled ? "Disable Control" : "Enable Control"}
      </button> */}
          </div>

          {latestBlob ? (
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <DocumentViewer
                style={{ height: "50vh", width: "100%" }}
                queryParams="hl=NL"
                url={latestBlob}
                viewerUrl={latestBlob}
                viewer="office"
                overrideLocalhost="https://react-doc-viewer.firebaseapp.com/"
              />
            </div>
          ) : (
            <p className="text-3xl text-gray-600 text-center py-10">
              Select a slide to preview
            </p>
          )}
          <div className="p-6 bg-gray-100">
            <h2 className="text-2xl font-semibold mb-2">Select a Template</h2>
            <div className="flex space-x-4 overflow-x-auto">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => {
                    alert("Work in progress");
                    return;
                    handleSelectTemplate(template);
                  }}
                  className={`p-4 w-44 h-24 flex items-center justify-center rounded-lg shadow-md cursor-pointer transition duration-150
              ${
                selectedTemplate.id === template.id
                  ? "bg-blue-500 text-white font-semibold"
                  : "bg-white text-gray-700 hover:bg-blue-100"
              } ${template.name !== "Blank Template" && "opacity-25"}`}
                >
                  {template.name}
                </div>
              ))}
            </div>

            {/* Displaying the selected template */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default PPTGen;
