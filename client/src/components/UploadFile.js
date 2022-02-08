import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import FileDetails from "./FileDetails";

import { getColumnNames, getTable } from "../services/fetchService";
import DisplayColumns from "./DisplayColumns";

const UploadFile = ({ file, setFile, setTable }) => {
  const [columns, setColumns] = useState(null);
  const [columnFilter, setColumnFilter] = useState([]);

  const handleColumnSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    const res = await getColumnNames(data);
    setColumns(res);
  };

  const handleParseFile = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("columns", columnFilter);
    const res = await getTable(data);
    setTable(res);
  };

  return (
    <>
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={handleColumnSubmit}
      >
        <h1>Upload File </h1>
        <FileDetails setFile={setFile} file={file} />
        <Box sx={{ width: 200, maxWidth: "100%", marginTop: 2 }}>
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            size="small"
            helperText="If columns not found update this value"
            defaultValue={1}
            fullWidth
          />
        </Box>

        <Button variant="outlined" disabled={!file} type="submit">
          Parse File
        </Button>
      </form>

      {columns && (
        <div>
          <DisplayColumns
            columns={columns}
            columnFilter={columnFilter}
            setColumnFilter={setColumnFilter}
          />
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleParseFile}
          >
            <button type="submit">Parse based on Columns</button>
          </form>
        </div>
      )}
    </>
  );
};

export default UploadFile;
