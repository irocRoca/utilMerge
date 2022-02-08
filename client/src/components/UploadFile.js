import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";
import FileDetails from "./FileDetails";
import { getColumnNames, getTable } from "../services/fetchService";
import DisplayColumns from "./DisplayColumns";

const UploadFile = ({
  file,
  setFile,
  table,
  setTable,
  index,
  columnFilter,
  setColumnFilter,
  title,
}) => {
  const [columns, setColumns] = useState(null);
  const [headerRow, setHeaderRow] = useState(1);
  const [show, setShow] = useState(false);

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
    setShow(!show);
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
        <Box sx={{ width: 200, maxWidth: "100%", margin: "24px auto" }}>
          <TextField
            id="outlined-number"
            label="Index of Column Headers"
            type="number"
            size="small"
            // helperText="If invalid columns update this value"
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
            displayHelper
          />
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleParseFile}
          >
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ marginBottom: 4 }}
            >
              Parse based on Columns
            </Button>
          </form>
          <Collapse in={show}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Sucessfully Parsed File.
            </Alert>
          </Collapse>
        </div>
      )}
    </>
  );
};

export default UploadFile;
