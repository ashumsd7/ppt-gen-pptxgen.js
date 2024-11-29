import React, { useState } from "react";

import pptxgen from "pptxgenjs";
import { BlobServiceClient } from "@azure/storage-blob";
import { RiDownload2Fill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { TbClipboardTypography } from "react-icons/tb";
import {
  generateTextAndTableSlideV1,
  generateTextAndTableSlideV10,
  generateTextAndTableSlideV11,
  generateTextAndTableSlideV2,
  generateTextAndTableSlideV3,
  generateTextAndTableSlideV4,
  generateTextAndTableSlideV5,
  generateTextAndTableSlideV6,
  generateTextAndTableSlideV7,
  generateTextAndTableSlideV8,
  generateTextAndTableSlideV9,
} from "./utils/helper";
import { GrAttachment, GrFormAttachment } from "react-icons/gr";
import { RiAiGenerate } from "react-icons/ri";
import {
  DEFAULT_CHART_OBJECT,
  DEFAULT_IMAGE_OBJECT,
  DEFAULT_TABLE_OBJECT,
  DEFAULT_TEXT_OBJECT,
  defaultSlideData,
} from "./data";
import { templates } from "./data/constant";

import PdfTextExtractor from "../src/components/PPT/PDFtextExtractor";
import DocTextExtractor from "../src/components/PPT/DocTextExtractor";
import SlideControlsTest from "../src/components/PPT/SlideControlsTest";
import ImageViewer from "../src/components/PPT/ImageViewer";
import Sidebar from "../src/components/PPT/Sidebar";
import { getCurrentStatusOfPPT } from "./utils/function";
import Button from "./components/ui/Button";
import InsertTable from "./components/PPT/InsertTable";
import InsertImage from "./components/PPT/InsertImage";

// Tab data

function PPTGen() {
  // State for toggling between "Generate PPT" and "Show List"
  const [pdfText, setPdfText] = useState("");
  const [blobList, setBlobList] = useState([]);
  const [latestSlides, setLatestSlides] = useState([]);
  const [slideMode, setSlideMode] = useState("text");
  const [pptName, setPptName] = useState(
    "United_" + Math.ceil(Math.random() * 100)
  );
  // for output image array
  const [imageArray, setImageArray] = useState([]);

  const [textView, setTextView] = useState(true);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 20Nov
  const [slidesConfig, setSlidesConfig] = useState([]);
  const [activeSlide, setActiveSlide] = useState(1);

  const [selectedTemplate, setSelectedTemplate] = useState({
    id: 0,
    name: "Blank Template",
  });

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    localStorage.setItem("PPT_BG", template.bgColor.split("#")[1]);
  };

  // ------------------------- tokens----------------------
  const sasToken =
    "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-06-04T13:26:22Z&st=2024-11-05T05:26:22Z&spr=https,http&sig=pAcLQDyT%2BRNtUABOSobtIhb%2FuSA43rbiU0btYf%2FVttw%3D";
  const containerName = `cmpptgencontainerv1`;
  const storageAccountName = "codemonkpptgen";

  const [latestBlob, setLatestBlob] = useState("");
  const [lastSlides, setLastSlides] = useState([]);
  // when pdf is uploaded
  const [pdfUrl, setPdfUrl] = useState();

  // getting all prev ppts
  const getBlobsInContainer = async (containerClient) => {
    const returnedBlobUrls = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      // if image is public, just construct URL
      returnedBlobUrls.push(
        `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
      );
    }

    setBlobList(returnedBlobUrls);
    return returnedBlobUrls;
  };

  // uploading  pp tto azure and return URL
  async function uploadFileToBlob2(fileBlob, fileName) {
    setIsLoading(true);
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

      const fileUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${fileName}`;
      console.log("File URL:", fileUrl);
      // Converting PPT to Images ( using backend)
      onConvertPPT2Images(fileUrl);
      return fileUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
  }
  let pptx = new pptxgen();

  function onAddChart() {
    // Function logic for adding a chart
    // before adding  chart we can expect a file upload and then preapre a chart
    // if isTextAvailable is available then we need to add new slide as chart and v2 half  half
    // here we can also  decide 30% text vs 50% text
    const { prevConfigs, lastSlide, lastSlideItems, isTextAvailable } =
      getCurrentStatusOfPPT(slidesConfig, activeSlide);
    if (isTextAvailable && lastSlideItems.length == 1) {
      console.log("Text ✅, No  Media : Add in this slide v1=>v2");
      lastSlideItems.push({
        ...DEFAULT_CHART_OBJECT,
      });
      lastSlide.layout = "v2";
      setSlidesConfig(prevConfigs);
      layoutGenerator(pptx, prevConfigs);
      return;
    }
    if (isTextAvailable && lastSlideItems.length == 2) {
      console.log("Text ✅, One Media : Add in this slide  v2=>v3 x");
      console.log("");
      lastSlideItems.push({
        ...DEFAULT_CHART_OBJECT,
      });
      lastSlide.layout = "v4";
      setSlidesConfig(prevConfigs);
      layoutGenerator(pptx, prevConfigs);
      return;
    }
    if (isTextAvailable && lastSlideItems.length == 3) {
      console.log("Text ✅, Two Media => Add New Slide");
      onAddSlide("chart");
      return;
    }

    if (!isTextAvailable && lastSlideItems.length == 1) {
      console.log(
        "Text ❌, One Media Add in this slide, if this is the case landscape image will be added, later we will worry about layout"
      );
      //if this is the case landscape image will be added
      addSecondMediaOnExistingSlide("chart");
      return;
    }
    if (!isTextAvailable && lastSlideItems.length == 2) {
      console.log("Text ❌, Two  Media => Add New Slide ");
      onAddSlide("chart");
      return;
    }
    // it means there is nothing completely new slide
    if (!isTextAvailable && lastSlideItems.length == 0) {
      addSingleMediaOnExistingBlankSlide("chart");
      return;
    }
  }

  function onAddTable() {
    // Function logic for adding a table
    const { prevConfigs, lastSlide, lastSlideItems, isTextAvailable } =
      getCurrentStatusOfPPT(slidesConfig, activeSlide);
    // if isTextAvailable is available then we need to add new slide as chart and v2 half  half
    // here we can also  decide 30% text vs 50% text

    if (isTextAvailable && lastSlideItems.length == 1) {
      console.log("Text ✅, No  Media : Add in this slide v1=>v2");
      lastSlideItems.push({
        ...DEFAULT_TABLE_OBJECT,
      });
      lastSlide.layout = "v2";

      console.log("lastSlide", lastSlide);

      console.log("prevConfigs", prevConfigs);

      setSlidesConfig(prevConfigs);
      layoutGenerator(pptx, prevConfigs);
      return;
    }
    if (isTextAvailable && lastSlideItems.length == 2) {
      console.log("Text ✅, One Media : Add in this slide  v2=>v3");
      console.log("Text ✅, One Media : Add in this slide  v2=>v3 x");
      console.log("");
      lastSlideItems.push({
        ...DEFAULT_TABLE_OBJECT,
      });
      lastSlide.layout = "v4";
      setSlidesConfig(prevConfigs);
      layoutGenerator(pptx, prevConfigs);
      return;
    }
    if (isTextAvailable && lastSlideItems.length == 3) {
      console.log("Text ✅, Two Media => Add New Slide");
      onAddSlide("table");
      return;
    }

    if (!isTextAvailable && lastSlideItems.length == 1) {
      console.log(
        "Text ❌, One Media Add in this slide, if this is the case landscape image will be added, later we will worry about layout"
      );
      //if this is the case landscape image will be added
      addSecondMediaOnExistingSlide("table");
      return;
    }
    if (!isTextAvailable && lastSlideItems.length == 2) {
      console.log("Text ❌, Two  Media => Add New Slide ");
      onAddSlide("table");
      return;
    }
    // it means there is nothing completely new slide
    if (!isTextAvailable && lastSlideItems.length == 0) {
      addSingleMediaOnExistingBlankSlide("table");
      return;
    }
  }

  function onAddImage() {
    // Function logic for adding an image
    // Function logic for adding a table
    const { prevConfigs, lastSlide, lastSlideItems, isTextAvailable } =
      getCurrentStatusOfPPT(slidesConfig, activeSlide);
    // if isTextAvailable is available then we need to add new slide as chart and v2 half  half
    // here we can also  decide 30% text vs 50% text

    if (isTextAvailable && lastSlideItems.length == 1) {
      console.log("Text ✅, No  Media : Add in this slide v1=>v2");
      lastSlideItems.push({
        ...DEFAULT_IMAGE_OBJECT,
      });
      lastSlide.layout = "v2";

      console.log("lastSlide", lastSlide);

      console.log("prevConfigs", prevConfigs);

      setSlidesConfig(prevConfigs);
      layoutGenerator(pptx, prevConfigs);
      return;
    }
    if (isTextAvailable && lastSlideItems.length == 2) {
      console.log("Text ✅, One Media : Add in this slide  v2=>v3");

      console.log("Text ✅, One Media : Add in this slide  v2=>v3 x");
      console.log("");
      lastSlideItems.push({
        ...DEFAULT_IMAGE_OBJECT,
      });
      lastSlide.layout = "v4";
      setSlidesConfig(prevConfigs);
      layoutGenerator(pptx, prevConfigs);
      return;
    }
    if (isTextAvailable && lastSlideItems.length == 3) {
      console.log("Text ✅, Two Media => Add New Slide");
      onAddSlide("image");
      return;
    }

    if (!isTextAvailable && lastSlideItems.length == 1) {
      console.log(
        "Text ❌, One Media Add in this slide, if this is the case landscape image will be added, later we will worry about layout"
      );
      //if this is the case landscape image will be added
      addSecondMediaOnExistingSlide("image");
      return;
    }
    if (!isTextAvailable && lastSlideItems.length == 2) {
      console.log("Text ❌, Two  Media => Add New Slide ");
      onAddSlide("image");
      return;
    }
    // it means there is nothing completely new slide
    if (!isTextAvailable && lastSlideItems.length == 0) {
      addSingleMediaOnExistingBlankSlide("image");
      return;
    }
  }

  function onSummarize() {
    // Function logic for summarizing
  }
  function onAddSlide(type, e) {
    // Function logic for adding slide
    console.log("Prev slides Coding", slidesConfig);
    console.log("type is", type);
    console.log("2nd is", e);
    const prevSlides = [...slidesConfig];
    const newSlideConfig = {
      ...defaultSlideData,
      title: "",
      layout: "v1",
      slideId: slidesConfig.length + 1,
    };

    if (type == "chart") {
      newSlideConfig.slideDataArray = [{ ...DEFAULT_CHART_OBJECT }];
    }
    if (type == "image") {
      newSlideConfig.slideDataArray = [{ ...DEFAULT_IMAGE_OBJECT }];
    }
    if (type == "table") {
      newSlideConfig.slideDataArray = [{ ...DEFAULT_TABLE_OBJECT }];
    }
    console.log("New slide", newSlideConfig);
    prevSlides.push(newSlideConfig);
    console.log("prevSlides", prevSlides);
    setSlidesConfig(prevSlides);
    layoutGenerator(pptx, prevSlides);
  }
  // this function for adding items if slide is blank

  function addSingleMediaOnExistingBlankSlide(type) {
    // Function logic for adding slide
    console.log("Prev slides Coding", slidesConfig);
    const existingSlide = { ...slidesConfig[activeSlide - 1] };
    console.log("existingSlide", existingSlide);
    if (type == "chart") {
      existingSlide.slideDataArray = [{ ...DEFAULT_CHART_OBJECT }];
    }
    if (type == "image") {
      existingSlide.slideDataArray = [{ ...DEFAULT_IMAGE_OBJECT }];
    }
    if (type == "table") {
      existingSlide.slideDataArray = [{ ...DEFAULT_TABLE_OBJECT }];
    }
    console.log("New slide", existingSlide);
    const prevSlides = [...slidesConfig];
    console.log("prevSlides", prevSlides);
    prevSlides[activeSlide - 1] = existingSlide;
    console.log("update slide", prevSlides);
    setSlidesConfig(prevSlides);
    layoutGenerator(pptx, prevSlides);
  }

  function addSecondMediaOnExistingSlide(type) {
    // Function logic for adding slide
    console.log("Prev slides Coding", slidesConfig);
    const existingSlide = { ...slidesConfig[activeSlide - 1] };
    console.log("existingSlide", existingSlide);
    existingSlide.layout = "v9";
    if (type == "chart") {
      const newChartObject = {
        ...DEFAULT_CHART_OBJECT,
      };
      console.log("newChartObject", newChartObject);
      existingSlide.slideDataArray.push(newChartObject);
      console.log("existingSlide", existingSlide);
    }
    if (type == "image") {
      const newChartObject = {
        ...DEFAULT_IMAGE_OBJECT,
      };
      console.log("newChartObject", newChartObject);
      existingSlide.slideDataArray.push(newChartObject);
    }
    if (type == "table") {
      const newChartObject = {
        ...DEFAULT_TABLE_OBJECT,
      };
      console.log("newChartObject", newChartObject);
      existingSlide.slideDataArray.push(newChartObject);
    }
    console.log("New slide 123", existingSlide);
    const prevSlides = [...slidesConfig];
    console.log("prevSlides", prevSlides);
    prevSlides[activeSlide - 1] = existingSlide;
    console.log("update slide", prevSlides);

    setSlidesConfig(prevSlides);
    layoutGenerator(pptx, prevSlides);
  }

  // Generating diff   layout of slide

  function layoutGenerator(pptx, slidesArray) {
    setIsLoading(true);
    console.log("Config before selecting layout ", slidesArray);
    const config = {};

    slidesArray.forEach((slideData) => {
      console.log("slideData", slideData);
      console.log("Layout is", slideData?.layout);

      switch (slideData.layout) {
        case "v1":
          //Active
          generateTextAndTableSlideV1(pptx, slideData);
          break;

        case "v2":
          //Active
          generateTextAndTableSlideV2(pptx, slideData);
          break;

        case "v3":
          generateTextAndTableSlideV3(pptx, config);
          break;

        case "v4":
          //Active
          generateTextAndTableSlideV4(pptx, slideData);
          break;

        case "v5":
          generateTextAndTableSlideV5(pptx, config);
          break;

        case "v6":
          generateTextAndTableSlideV6(pptx, config);
          break;

        case "v7":
          generateTextAndTableSlideV7(pptx, config);
          break;

        case "v8":
          generateTextAndTableSlideV8(pptx, config);
          break;
        case "v9":
          generateTextAndTableSlideV9(pptx, slideData);
          break;
        case "v10":
          generateTextAndTableSlideV10(pptx, config);
          break;
        case "v11":
          generateTextAndTableSlideV11(pptx, config);
          break;

        default:
          console.log("Unknown layout value: " + slideData.layout);
          break;
      }
    });

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
      const res = await uploadFileToBlob2(pptBlob, `Codemonk.pptx`);
      setLatestBlob(res);
      const prevArr = [...latestSlides];
      prevArr.push(res);
      setLatestSlides(prevArr);
      const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
      );
      const containerClient = blobService.getContainerClient(containerName);

      return getBlobsInContainer(containerClient);
    });
  }

  // Main function
  async function generateAndUploadPPT(prevSlidesData = lastSlides, reordered) {
    //  logic to decide layout

    layoutGenerator(pptx, [
      { ...defaultSlideData, type: "chart", layout: "v1" },
    ]);

    return;
  }

  const handleRemove = (slideOrder) => {
    // Clone the current slides array
    const reorderedSlides = [...lastSlides];
    if (reorderedSlides.length == 1) {
      alert("PPT has 1 slide cant be deleted");
      return;
    }
    // Find the index of the slide to be removed
    const slideIndex = reorderedSlides.findIndex(
      (slide) => slide.order === slideOrder
    );

    if (slideIndex !== -1) {
      // Remove the slide at the identified index
      reorderedSlides.splice(slideIndex, 1);
      const updatedSlides = reorderedSlides.map((slide, index) => ({
        ...slide,
        order: index,
      }));

      console.log("updatedSlides after deletion", updatedSlides);
      setLastSlides(updatedSlides);
      // Call generateAndUploadPPT with updated slides
      generateAndUploadPPT(updatedSlides, true);
    }
  };

  const handleTextButtonClick = () => {
    console.log("From Text button clicked");
    setTextView(true);
    setIsSidebarOpen(true);
  };

  const handleUploadButtonClick = () => {
    console.log("Upload a File button clicked");
    setTextView(false);
  };

  // / this is CTA of page 1
  const handleGenerateSlides = () => {
    console.log("Upload a File button clicked");
    setActiveSlide(1);
    setImageArray([]);
    setLatestBlob("");
    setPdfUrl("");

    // Here we are generating first slide,
    // here we need to add title and data ( as text only )
    // for now i have added dummy bullet points
    const prevConfigs = {
      ...defaultSlideData,
      type: "text",
      layout: "v1",
      slideDataArray: [{ ...DEFAULT_TEXT_OBJECT }],
      title: pptName,
    };
    setSlidesConfig([prevConfigs]);
    // and we are preparing very first slide using Title and Large Max text : layout v1
    layoutGenerator(pptx, [prevConfigs]);
  };

  // Function to call the /convert-pptx endpoint
  async function convertPptxToPdf(pptxUrl) {
    try {
      // Send the POST request to the backend with pptxUrl
      const response = await fetch("http://localhost:3000/convert-pptx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pptxUrl }), // Send the pptxUrl as JSON
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to convert PPTX to PDF");
      }

      // Parse the JSON response
      const data = await response.json();
      console.log("data", data);
      console.log("PDF URL:", data.uploadedUrls); // Print the PDF URL
      setImageArray(data?.uploadedUrls);
      setPdfUrl(data?.pdfUrl);
      setIsLoading(false);
      setIsGenerated(true);
      return data.pdfUrl; // Return the PDF URL
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function onConvertPPT2Images(url) {
    const pptxUrl =
      url ||
      "https://codemonkpptgen.blob.core.windows.net/cmpptgencontainerv1/Slide_text_379_1732692286147.pptx";
    convertPptxToPdf(pptxUrl).then((pdfUrl) => {
      if (pdfUrl) {
        // Use the PDF URL as needed, e.g., display it or provide a download link
        console.log("All done", pdfUrl);
      }
    });
  }

  // when Download clicked
  function onClickDownload(type = "pdf") {
    const link = document.createElement("a");
    link.href = type == "pdf" ? pdfUrl : latestBlob;
    link.download = "document.pdf"; // Specify the name of the downloaded file
    link.click();
  }

  function onEditSlide() {
    setIsSidebarOpen(true);
  }
  return (
    <div className="relative min-h-screen  ">
    
      {!isGenerated ? (
        <div className=" flex flex-col border  h-full p-6">
          <h1 className="text-2xl font-bold  text-black">
            Generate Presentation With AI
          </h1>

          <div className="my-4  ">
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              Presentation Title
            </label>
            <input
              placeholder="Presentation text"
              value={pptName}
              onChange={(e) => setPptName(e.target.value)}
              className=" p-2 border border-gray-300 w-[400px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <Button
              onClick={handleTextButtonClick}
              type={textView ? "solid" : "outline"}
            >
             <TbClipboardTypography className="text-2xl" /> From Text
            </Button>
            <Button
              onClick={handleUploadButtonClick}
              type={!textView ? "solid" : "outline"}
            >
             <GrFormAttachment className="text-2xl"/> Upload a File
            </Button>
          </div>

          {/* <OfficeFileTextExtractor/> */}

          <div className="mt-4  border">
            {textView ? (
              <textarea
                placeholder="Enter content here"
                value={pdfText}
                onChange={(e) => setPdfText(e.target.value)}
                className="w-full h-[300px] p-2 text-sm font-serif leading-10  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="flex w-[98vw] justify-center items-center  p-1">
                {/* <Dashboard
                  uppy={uppy}
                  height={190}
                  hideUploadButton
                  proudlyDisplayPoweredByUppy={false}
                /> */}
                <PdfTextExtractor
                  pdfText={pdfText}
                  setPdfText={setPdfText}
                  setTextView={setTextView}
                />
                <DocTextExtractor
                  text={pdfText}
                  setText={setPdfText}
                  setTextView={setTextView}
                />
              </div>
            )}
          </div>

          <div className="  mt-4">
            <h2 className="text-xl font-semibold mb-3">Select Templates</h2>
            <div className="flex space-x-4 overflow-x-auto ">
              {templates.map((template) => (
                <div className="flex flex-col gap-2 justify-center items-center">
                  <div
                    key={template.id}
                    onClick={() => {
                      handleSelectTemplate(template);
                    }}
                    className={`p-4 w-[245px] relative h-[136px] border flex items-center justify-center shadow-md cursor-pointer transition duration-150
      ${
        selectedTemplate.id === template.id
          ? "text-2xl font-semibold"
          : "text-gray-700 hover:bg-gray-500"
      }
   `}
                    style={{ backgroundColor: template.bgColor }} // Inline style for dynamic background color
                  >
                    {selectedTemplate.id === template.id && (
                      <FaCheckCircle className="absolute top-2 h-5 w-5 right-2 text-[#1f36c7] bg-white rounded-full  font-bold" />
                    )}
                  </div>
                  <span> {template.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end ">
              <Button disabled={isLoading} onClick={handleGenerateSlides}>
              <RiAiGenerate className="text-xl"/>  {isLoading ? "Generating..." : " Generate PPT"}
              </Button>
            </div>
            {/* Displaying the selected template */}
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full  ">
          <div className="flex gap-2 justify-between py-2 px-6">
            <span
              className="p-2 cursor-pointer"
              onClick={() => {
                if (isLoading) return;
                setIsGenerated(false);
              }}
            >
              {isLoading ? "Updating PPT..." : "Go back"}
            </span>

            <div className="flex gap-2">
              {latestBlob && (
                <Button
                  onClick={() => {
                    onClickDownload("ppt");
                  }}
                >
                  {" "}
                  <RiDownload2Fill /> Download
                </Button>
              )}
            </div>
          </div>
          {/* Left Sidebar - Navigation and Content Input */}

          {/* Main Content - PPT Viewer and Reorder Section */}
          <main className="w-full p-2  flex  border flex-col ">
            <div className="flex gap-2  w-full">
              {latestBlob ? (
                <>
                  <ImageViewer
                    imageArray={imageArray}
                    activeSlide={activeSlide}
                    setActiveSlide={setActiveSlide}
                    controls={
                      <SlideControlsTest
                        onAddChart={onAddChart}
                        onAddTable={onAddTable}
                        onAddImage={onAddImage}
                        onSummarize={onSummarize}
                        onAddSlide={onAddSlide}
                        onEditSlide={onEditSlide}
                        isLoading={isLoading}
                      />
                    }
                  />
                </>
              ) : (
                <p className="text-3xl text-gray-600 text-center py-10">
                  Select a slide to preview
                </p>
              )}
            </div>
            {/* <DocumentViewer
              style={{ height: "50vh", width: "100%" }}
              queryParams="hl=NL"
              url={latestBlob}
              viewerUrl={encodeURIComponent(latestBlob)}
              viewer="office"
              overrideLocalhost="https://react-doc-viewer.firebaseapp.com/"
            /> */}
          </main>
          {/* <SlideControls
            handleUploadButtonClick={handleDropdownChange}
            handleDropdownChange={handleDropdownChange}
          /> */}
        </div>
      )}

      {/* <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} /> */}
      {/* <InsertImage isOpen={isSidebarOpen}  setIsOpen={setIsSidebarOpen} /> */}
      <InsertTable isOpen={isSidebarOpen}  setIsOpen={setIsSidebarOpen} />
    </div>
  );
}

export default PPTGen;
