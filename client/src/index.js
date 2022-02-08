import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FileContextProvider from "./context/FileContext";

ReactDOM.render(
  <React.StrictMode>
    <FileContextProvider>
      <App />
    </FileContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
