import React, { useState } from "react";
import Mammoth from "mammoth";

function DocTextExtractor({text,setText,setTextView}) {
  // const [text, setText] = useState("");

  const handleFileUpload = async (event) => {

    const file = event.target.files[0];

    if (file) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        console.log("arrayBuffer",arrayBuffer);
        const result = await Mammoth.extractRawText({ arrayBuffer });
        console.log("result",result);
        setText(result.value); // Set the extracted text\
        setTextView(true)
      } catch (error) {
        console.error("Error extracting text from file:", error);
      }
    }
  };

  return (
    <div>
 
      <input type="file" accept=".doc,.docx" onChange={handleFileUpload} />
      {/* <div>
        <h3>Extracted Text x:</h3>
        <pre>{text}</pre>
      </div> */}
    </div>
  );
}

export default DocTextExtractor;
