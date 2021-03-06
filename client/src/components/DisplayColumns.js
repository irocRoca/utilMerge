import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Box, Typography } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" aria-label="delete" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const DisplayColumns = ({
  columns,
  setColumnFilter,
  columnFilter,
  label,
  displayHelper,
}) => {
  const handleColumnChange = (e) => {
    let value = e.target.textContent;
    if (e.target.tagName === "svg") {
      value = e.target.parentNode.firstChild.textContent;
    } else if (e.target.tagName === "path") {
      value = e.target.parentNode.parentNode.firstChild.textContent;
    }
    if (e.target.ariaSelected && !columnFilter.includes(e.target.textContent))
      setColumnFilter([...columnFilter, e.target.textContent]);
    else setColumnFilter(columnFilter.filter((item) => item !== value));
  };

  return (
    <Box>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={columns}
        disableCloseOnSelect
        onChange={handleColumnChange}
        getOptionLabel={(option) => option}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8, pointerEvents: "none" }}
              checked={selected}
            />
            {option}
          </li>
        )}
        style={{ width: 400, margin: " 16px auto" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label ? label : "Column Names"}
            placeholder="Select Columns"
          />
        )}
      />
      {displayHelper && (
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          sx={{ color: "#7c8083" }}
        >
          If invalid columns update index of column headers
        </Typography>
      )}
    </Box>
  );
};

export default DisplayColumns;
