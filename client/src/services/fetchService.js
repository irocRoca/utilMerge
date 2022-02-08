import axios from "axios";

export const getColumnNames = async (data) => {
  try {
    const res = await axios.post("api/columns", data);
    console.log(res);
    return res.data.columns;
  } catch (err) {
    console.log(err);
  }
};

export const getTable = async (data) => {
  try {
    const res = await axios.post("api/parse", data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
