import { useState } from "react";
import "./App.css";
import BasicTable from "./components/BasicTable";

import UploadFile from "./components/UploadFile";

function App() {
  const [leftFile, setLeftFile] = useState(null);
  const [rightFile, setRightFile] = useState(null);
  const [leftTable, setLeftTable] = useState(null);
  const [rightTable, setRightTable] = useState(null);

  return (
    <div className="App">
      <UploadFile
        file={leftFile}
        setFile={setLeftFile}
        setTable={setLeftTable}
      />

      {leftTable && <BasicTable data={leftTable} />}
      {leftTable && (
        <table>
          <thead>
            <tr>
              {Object.keys(leftTable).map((item) => (
                <th>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(leftTable[Object.keys(leftTable)[0]]).map(
              (_, index) => (
                <tr>
                  {Object.keys(leftTable).map((column) => (
                    <td>{leftTable[column][index]}</td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
