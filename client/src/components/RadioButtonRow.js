import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
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
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        sx={{ marginTop: "8px", color: "#7c8083" }}
      >
        Hover over methods to read details.
      </Typography>
    </FormControl>
  );
};

export default RadioButtonRow;

const joinFormats = [
  {
    name: "left",
    title: "All rows from the first and those matching from second",
  },
  {
    name: "right",
    title: "All rwos the from second and those matching from first",
  },
  { name: "outer", title: "All rows from both" },
  { name: "inner", title: "Only matching rows" },
];
