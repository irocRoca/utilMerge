import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useContext, useState, useRef } from "react";
import "./App.css";
import BasicTable from "./components/BasicTable";
import DisplayColumns from "./components/DisplayColumns";
import RadioButtonRow from "./components/RadioButtonRow";

import UploadFile from "./components/UploadFile";
import { MyContext } from "./context/FileContext";
import { getCsvFile, getMergedTable } from "./services/fetchService";

function App() {
  const fileEle = useRef(null);
  const [value, setValue] = useState("inner");
  const [leftFilter, setLeftFilter] = useState([]);
  const [rightFilter, setRightFilter] = useState([]);
  const [matchOn, setMatchOn] = useState([]);
  const [mergedTable, setMergedTable] = useState(null);
  const [leftColumns, setLeftColumns] = useState(null);
  const [rightColumns, setRightColumns] = useState(null);

  const {
    leftFile,
    setLeftFile,
    setLeftTable,
    rightFile,
    setRightFile,
    setRightTable,
    leftTable,
    rightTable,
  } = useContext(MyContext);

  const handleParseFiles = async (e) => {
    const data = {
      ldf: leftTable,
      rdf: rightTable,
      method: value,
      on: matchOn,
    };
    const res = await getMergedTable(data);
    setMergedTable(JSON.parse(res.results));
  };

  const handleDownloadFile = async () => {
    try {
      const res = await getCsvFile({ table: mergedTable });
      const blob = new Blob([res], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      fileEle.current.setAttribute("href", url);
      fileEle.current.setAttribute("download", "export.csv");
      fileEle.current.click();
    } catch (err) {
      console.log(err);
    }
  };

  const resetFields = () => {
    setLeftFile(null);
    setRightFile(null);
    setLeftTable(null);
    setRightTable(null);
  };

  return (
    <div className="App">
      <Container maxWidth="sm" sx={{ marginY: 6 }}>
        <Paper sx={{ padding: 4 }}>
          <UploadFile
            file={leftFile}
            setFile={setLeftFile}
            table={leftTable}
            setTable={setLeftTable}
            index={1}
            columnFilter={leftFilter}
            setColumnFilter={setLeftFilter}
            title="Upload File"
            setColumns={setLeftColumns}
            columns={leftColumns}
          />

          {leftTable && (
            <>
              <Divider
                variant="middle"
                sx={{ marginTop: 2, marginBottom: 4 }}
              />

              <UploadFile
                file={rightFile}
                setFile={setRightFile}
                table={rightTable}
                setTable={setRightTable}
                index={2}
                columnFilter={rightFilter}
                setColumnFilter={setRightFilter}
                title="Upload secondary file"
                setColumns={setRightColumns}
                columns={rightColumns}
              />
              {rightTable && (
                <>
                  {!!leftFilter.length && !!rightFilter.length && (
                    <DisplayColumns
                      columns={leftFilter.filter((item) =>
                        rightFilter.includes(item)
                      )}
                      setColumnFilter={setMatchOn}
                      columnFilter={matchOn}
                      label="Column to merge on"
                    />
                  )}
                  <RadioButtonRow value={value} setValue={setValue} />
                  <Button
                    variant="outlined"
                    onClick={handleParseFiles}
                    disabled={!leftTable || !rightTable}
                  >
                    Merge Files
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleDownloadFile}
                    disabled={!mergedTable}
                  >
                    Download File
                  </Button>
                  <a ref={fileEle} href="/" style={{ display: "none" }} hidden>
                    File Download
                  </a>
                  <Button onClick={resetFields}>Reset Fields</Button>
                </>
              )}
            </>
          )}
        </Paper>
      </Container>
      {mergedTable && <BasicTable data={mergedTable} />}
    </div>
  );
}

export default App;
