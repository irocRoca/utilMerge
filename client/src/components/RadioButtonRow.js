import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

const RadioButtonRow = ({ value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <FormControl>
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
          <FormControlLabel
            key={index}
            value={item}
            control={<Radio />}
            label={`${item.toUpperCase()}`}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonRow;

const joinFormats = ["left", "right", "outer", "inner", "cross"];
