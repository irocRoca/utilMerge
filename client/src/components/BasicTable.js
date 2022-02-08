import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const BasicTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {Object.keys(data).map((columnName, index) => (
              <TableCell align={index === 0 ? "" : "right"}>
                {columnName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(data[Object.keys(data)[0]]).map((_, index) => (
            <>
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.keys(data).map((colName, sInx) => (
                  <TableCell
                    key={`${index} + ${sInx}`}
                    component={sInx === 0 ? "th" : ""}
                    scope={sInx === 0 ? "row" : ""}
                    align={sInx === 0 ? "" : "right"}
                  >
                    {data[colName][index]}
                  </TableCell>
                ))}
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
