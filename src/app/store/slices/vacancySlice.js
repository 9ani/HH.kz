import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/config/end-point";

export const vacancySlice = createSlice({
  name: "vacancy",
  initialState: {
    vacancies: [],
    vacancy: {},
    specializations: []
  },
  reducers: {
    setMyVacancies: (state, action) => {
      state.vacancies = action.payload.vacancies;
    },
    uppendVacancy: (state, action) => {
      state.vacancies = [...state.vacancies, action.payload.newvacancy];
    },
    setVacancy: (state, action) => {
      state.vacancy = action.payload.vacancy;
    },
    handleDeleteVacancy: (state, action) => {
      let vacancies = [...state.vacancies];
      vacancies = vacancies.filter((item) => item.id !== action.payload);
      state.vacancies = vacancies;
    },
    setSpecializations: (state, action) => {
      state.specializations = action.payload

    },
  },
});

export const { setMyVacancies, uppendVacancy, setVacancy, handleDeleteVacancy, setSpecializations } =
  vacancySlice.actions;

export const getMyVacancies = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/vacancy`);
    dispatch(setMyVacancies({ vacancies: res.data }));
  } catch (e) {
    alert("Something went wrong, Try later!");
  }
};

export const getSpecializations = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/specializations`);
    dispatch(setSpecializations( res.data ));
  } catch (e) {
    alert("Something went wrong, Try later!");
  }
};

export const getVacancyById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/vacancy/${id}`);
    dispatch(setVacancy(res.data ));
  } catch (e) {
    alert("Something went wrong, Try later!");
  }
};

export const createVacancy = (sendData, router) => async (dispatch) => {
  try {
    const res = await axios.post(`${END_POINT}/api/vacancy`, sendData);
    router.push("/resumes");
    dispatch(setMyVacancies({ vacancies: res.data }));
  } catch (e) {
    alert("Something went wrong, Try later!");
  }
};
export const editVacancy = (sendData, router) => async (dispatch) => {
  try {
    const res = await axios.put(`${END_POINT}/api/vacancy`, sendData);
    router.push("/vacancies");
  } catch (e) {
    alert("Something went wrong, Try later!");
  }
};
export const deleteVacancy = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${END_POINT}/api/vacancy/${id}`);
    dispatch(handleDeleteVacancy(id));
  } catch (e) {
    alert("Something went wrong, Try later!");
  }
};

export default vacancySlice.reducer;
