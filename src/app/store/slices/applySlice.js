import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/config/end-point";

let initialState = {
  applies: [],
  apply: {},
};

export const applySlice = createSlice({
  name: "apply",
  initialState,
  reducers: {
    appendApply: (state, action) => {
      state.applies = [...state.applies, action.payload];
    },
    setApplies: (state, action) => {
      state.applies = action.payload;
    },
    removeApply: (state, action) => {
      let applies = [...state.applies];
      applies = applies.filter((item) => item.id !== action.payload);
      state.applies = applies;
    },
  },
});

export const { appendApply, setApplies, removeApply } = applySlice.actions;

export const getEmployeeApplies = (data) => (dispatch) => {
  axios
    .get(`${END_POINT}/api/applies/employee`, {
    })
    .then((res) => {
      dispatch(setApplies(res.data));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getVacancyApplies = (data) => (dispatch) => {
  axios
    .get(`${END_POINT}/api/applies/vacancy/${id}`, {
      data,
    })
    .then((res) => {
      dispatch(setApplies(res.data));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const createApply = (data) => (dispatch) => {
  axios
    .post(`${END_POINT}/api/applies`, {
      data,
    })
    .then((res) => {
      dispatch(appendApply(res.data));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const deleteApply = (id) => (dispatch) => {
  axios
    .delete(`${END_POINT}/api/applies/${id}`)
    .then((res) => {
      dispatch(removeApply(id));
    })
    .catch((e) => {
      console.log(e);
    });
};
export default applySlice.reducer;