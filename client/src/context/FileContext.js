import { createContext, useState } from "react";

export const MyContext = createContext();

function FileContext({ children }) {
  const [leftFile, setLeftFile] = useState(null);
  const [rightFile, setRightFile] = useState(null);
  const [leftTable, setLeftTable] = useState(null);
  const [rightTable, setRightTable] = useState(null);

  return (
    <MyContext.Provider
      value={{
        leftFile,
        setLeftFile,
        rightFile,
        setRightFile,
        leftTable,
        setLeftTable,
        rightTable,
        setRightTable,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default FileContext;
