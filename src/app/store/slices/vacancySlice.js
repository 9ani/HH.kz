import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/config/end-point";

export const vacancySlice = createSlice({
  name: "vacancy",
  initialState: {
    vacancies: [],
    vacancy: {},
    specializations: [],
    cities: [],
    experiences: [],
    skills: [],
    empTypes: []
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
      state.specializations = action.payload;
    },
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setExperiences: (state, action) => {
      state.experiences = action.payload;
    },
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
    setEmpType: (state, action) => {
      state.empTypes = action.payload;
    },
  },
});

export const {
  setMyVacancies,
  uppendVacancy,
  setVacancy,
  handleDeleteVacancy,
  setSpecializations,
  setCities,
  setExperiences,
  setSkills,
  setEmpType,
} = vacancySlice.actions;

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
    console.log("Fetched specializations:", res.data); // Check the fetched data
    dispatch(setSpecializations(res.data));
  } catch (e) {
    console.error("Error fetching specializations:", e);
  }
};

export const getCities = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/region/cities`);
    dispatch(setCities(res.data));
  } catch (e) {
    console.error("Error fetching specializations:", e);
  }
};

export const getExperiences = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/experiences`);
    dispatch(setExperiences(res.data));
  } catch (e) {
    console.error("Error fetching specializations:", e);
  }
};

export const getSkills = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/skills`);
    dispatch(setSkills(res.data));
  } catch (e) {
    console.error("Error fetching specializations:", e);
  }
};


export const getEmpType = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/employment-types`);
    dispatch(setEmpType(res.data));
  } catch (e) {
    console.error("Error fetching specializations:", e);
  }
};
export const getVacancyById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/vacancy/${id}`);
    dispatch(setVacancy(res.data));
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
