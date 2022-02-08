import axios from "axios";

export const getColumnNames = async (data) => {
  try {
    const res = await axios.post("api/columns", data);
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

export const getMergedTable = async (data) => {
  try {
    const res = await axios.post("api/join", data, {
      headers: { "Content-type": "application/json" },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
