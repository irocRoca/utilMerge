import React from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const Input = styled("input")({
  display: "none",
});

const FileDetails = ({ setFile, file }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <>
      <label htmlFor="contained-button-file">
        <Input
          accept=".csv"
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileChange}
        />
        {file && <p>{file.name}</p>}
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
    </>
  );
};

export default FileDetails;
