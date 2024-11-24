import React, { useState } from "react";
import * as pdfjs from "pdfjs-dist/webpack";

const PdfTextExtractor = ({setPdfText,pdfText,setTextView}) => {


  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;

        try {
          const pdf = await pdfjs.getDocument(arrayBuffer).promise;
          let text = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map((item) => item.str).join(" ");
            text += `${pageText}\n\n`;
          }

          setPdfText(text);
          setTextView(true)
        } catch (error) {
          console.error("Error extracting text from PDF:", error);
          setPdfText("Failed to extract text from the PDF.");
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div style={{ padding: "20px" }} className="h-[290px] flex justify-center items-center">

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        style={{ marginBottom: "10px" }}
      />
      {/* <textarea
        value={pdfText}
        rows="20"
        cols="80"
        readOnly
        style={{ width: "100%", marginTop: "10px" }}
      /> */}
    </div>
  );
};

export default PdfTextExtractor;
