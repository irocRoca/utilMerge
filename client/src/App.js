import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [fileInfo, setFileInfo] = useState(null);
  const [masterList, setMasterList] = useState(null);
  const [columns, setColumns] = useState(null);
  const [filterBy, setFilterBy] = useState([]);
  const [table, setTable] = useState(null);

  const [checked, setChecked] = useState(false);
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileInfo(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("file", fileInfo);
      const res = await axios.post("api/columns", data);
      setColumns(res.data.columns);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChecked = (e) => {
    if (e.target.checked) setFilterBy([...filterBy, e.target.value]);
    else if (!e.target.checked && filterBy.includes(e.target.value))
      setFilterBy(filterBy.filter((item) => item !== e.target.value));
  };

  console.log(filterBy);

  const parseBasedOnColumns = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("file", fileInfo);
      data.append("columns", filterBy);
      const res = await axios.post("api/parse", data);
      console.log(res.data);
      //console.log(Object.keys(res.data));
      setTable(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(table);
  return (
    <div className="App">
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <label htmlFor="file">File</label>
        <input name="file" type="file" onChange={handleFile}></input>
        <label>
          <input type="checkbox" onChange={() => setChecked(!checked)} />
          <span>Please Verify that the first row is column headers</span>
        </label>
        <label htmlFor="column">Column Index</label>
        <input name="column" type="number" min="1" max="5" />
        <button disabled={!checked}>Parse File</button>
      </form>

      {columns && (
        <div>
          {columns.map((header) => (
            <label>
              <input type="checkbox" onChange={handleChecked} value={header} />
              <span>{header}</span>
            </label>
          ))}
        </div>
      )}

      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={parseBasedOnColumns}
      >
        <label htmlFor="file">Master List</label>
        <input name="file" type="file" onChange={handleFile}></input>

        <button type="submit">Parse based on Columns</button>
      </form>

      {table && (
        <table>
          <thead>
            <tr>
              {Object.keys(table).map((item) => (
                <th>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(table[filterBy[0]]).map((_, index) => (
              <tr>
                {Object.keys(table).map((column) => (
                  <td>{table[column][index]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
