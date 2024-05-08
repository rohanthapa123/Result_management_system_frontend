import React, { useState } from 'react';

const ImportComponent = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Perform any validation if needed
      onFileUpload(selectedFile);
    } else {
      // Display error message if no file selected
      alert("Please select a file to upload.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImportComponent;
