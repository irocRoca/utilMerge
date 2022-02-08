import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Box } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const DisplayColumns = ({ columns, setColumnFilter, columnFilter }) => {
  const handleColumnChange = (e) => {
    if (e.target.ariaSelected)
      setColumnFilter([...columnFilter, e.target.textContent]);
    else if (
      !e.target.ariaSelected &&
      columnFilter.includes(e.target.textContent)
    )
      setColumnFilter(
        columnFilter.filter((item) => item !== e.target.textContent)
      );
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
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Column Names"
            placeholder="Select Columns"
          />
        )}
      />
    </Box>
  );
};

export default DisplayColumns;
