import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "../../../src/App.css";

const PdfViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [thumbnails, setThumbnails] = useState([]);

  // Function to update number of pages and generate thumbnails
  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    generateThumbnails(numPages);
  };

  // Generate Thumbnails
  const generateThumbnails = (numPages) => {
    let thumbList = [];
    for (let i = 1; i <= numPages; i++) {
      thumbList.push(i);
    }
    setThumbnails(thumbList);
  };

  // Handle thumbnail click to go to specific page
  const handleThumbnailClick = (pageNumber) => {
    setPageNumber(pageNumber);
  };

  // PDFjs worker settings
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  return (
    <div className="pdf-viewer-container">
      <div className="left-sidebar">
        <div className="thumbnail-list">
          {thumbnails.map((page, index) => (
            <div
              key={index}
              className={`thumbnail ${pageNumber === page ? "active" : ""}`}
              onClick={() => handleThumbnailClick(page)}
            >
              <Document
                file={pdfUrl}
                onLoadSuccess={onLoadSuccess}
                options={{ cMapUrl: 'cmaps/', cMapPacked: true }}
              >
                <Page pageNumber={page} width={50} />
              </Document>
            </div>
          ))}
        </div>
      </div>

      <div className="right-viewer">
      {pdfUrl}
        <Document
          file={pdfUrl}
          onLoadSuccess={onLoadSuccess}
          // options={{ cMapUrl: 'cmaps/', cMapPacked: true }}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
