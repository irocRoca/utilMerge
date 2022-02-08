import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import React from "react";

const RadioButtonRow = ({ value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <FormControl sx={{ marginY: 4 }}>
      <FormLabel id="demo-row-radio-buttons-group-label">
        Merge Method
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {joinFormats.map((item, index) => (
          <Tooltip title={item.title} key={index}>
            <FormControlLabel
              key={index}
              value={item.name}
              control={<Radio />}
              label={`${item.name.toUpperCase()}`}
            />
          </Tooltip>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonRow;

const joinFormats = [
  { name: "left", title: "All from first, matching from second" },
  { name: "right", title: "All from second, matching from frist" },
  { name: "outer", title: "All rows from both" },
  { name: "inner", title: "Only matching rows" },
  { name: "cross", title: "Creates the cartesian product" },
];
