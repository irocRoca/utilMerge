import React from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const Input = styled("input")({
  display: "none",
});

const FileDetails = ({
  setFile,
  file,
  index,
  setColumns,
  columns,
  setColumnFilter,
}) => {
  const handleFileChange = (e) => {
    const incomingfile = e.target.files[0];
    if (incomingfile) {
      setFile(incomingfile);
      if (columns != null && incomingfile.name !== file?.name) {
        setColumns(null);
        setColumnFilter(null);
      }
    } else {
      setFile(null);
      setColumns(null);
    }
  };

  return (
    <>
      <label htmlFor={index}>
        <Input
          accept=".csv"
          id={index}
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
