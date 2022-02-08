import { Box, Button, TextField, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { useState } from "react";
import FileDetails from "./FileDetails";
import { getColumnNames, getTable } from "../services/fetchService";
import DisplayColumns from "./DisplayColumns";

const UploadFile = ({
  file,
  setFile,
  setTable,
  index,
  columnFilter,
  setColumnFilter,
  title,
}) => {
  const [columns, setColumns] = useState(null);
  const [headerRow, setHeaderRow] = useState(1);

  const handleColumnSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("colIndex", headerRow - 1);
    const res = await getColumnNames(data);
    setColumns(res);
  };

  const handleParseFile = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("columns", columnFilter);
    data.append("colIndex", headerRow - 1);
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
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <UploadFileIcon fontSize="large" sx={{ marginRight: 2 }} />
          {title ? title : "Upload File"}
        </Typography>
        <FileDetails setFile={setFile} file={file} index={index} />
        <Box sx={{ width: 200, maxWidth: "100%", marginTop: 2 }}>
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            size="small"
            helperText="If columns not found update this value"
            fullWidth
            value={headerRow}
            onChange={(e) => setHeaderRow(e.target.value)}
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
