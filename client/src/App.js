import { Button, Container, Paper } from "@mui/material";
import { useContext, useState } from "react";
import "./App.css";
import BasicTable from "./components/BasicTable";
import DisplayColumns from "./components/DisplayColumns";
import RadioButtonRow from "./components/RadioButtonRow";

import UploadFile from "./components/UploadFile";
import { MyContext } from "./context/FileContext";
import { getMergedTable } from "./services/fetchService";

function App() {
  const [value, setValue] = useState("inner");
  const [leftFilter, setLeftFilter] = useState([]);
  const [rightFilter, setRightFilter] = useState([]);
  const [matchOn, setMatchOn] = useState([]);
  const [mergedTable, setMergedTable] = useState(null);

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

  return (
    <div className="App">
      <Container maxWidth="sm" sx={{ marginY: 6 }}>
        <Paper sx={{ padding: 4 }}>
          <UploadFile
            file={leftFile}
            setFile={setLeftFile}
            setTable={setLeftTable}
            index={1}
            columnFilter={leftFilter}
            setColumnFilter={setLeftFilter}
            title="Upload File"
          />

          <UploadFile
            file={rightFile}
            setFile={setRightFile}
            setTable={setRightTable}
            index={2}
            columnFilter={rightFilter}
            setColumnFilter={setRightFilter}
            title="Upload secondary file"
          />
          <RadioButtonRow value={value} setValue={setValue} />
          {leftFilter.length && rightFilter.length && (
            <DisplayColumns
              columns={leftFilter.filter((item) => rightFilter.includes(item))}
              setColumnFilter={setMatchOn}
              columnFilter={matchOn}
              label="Match on"
            />
          )}
          <Button variant="outlined" onClick={handleParseFiles}>
            Merge Files
          </Button>
        </Paper>
      </Container>
      {mergedTable && <BasicTable data={mergedTable} />}
    </div>
  );
}

export default App;
