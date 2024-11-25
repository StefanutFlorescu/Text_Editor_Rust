import React from "react";
import "./TextInput.css";

const TextInput = ({ fileContent, setFileContent }) => {
  const handleChange = (event) => {
    setFileContent(event.target.value); 
  };

  return (
    <div className="text-input-container">
      <textarea 
        id="textInput"
        value={fileContent} 
        onChange={handleChange}
        className="text-input"
        placeholder="Type something..."
      />
    </div>
  );
};

export default TextInput;
