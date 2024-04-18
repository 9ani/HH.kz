import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/config/end-point";

export const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    resumes: [],
    resume: {},
  },
  reducers: {
    setMyResumes: (state, action) => {
      state.resumes = action.payload.resumes;
    },
    uppendResume: (state, action) => {
      state.resumes = [...state.resumes, action.payload.newresume];
    },
    setResume: (state, action) => {
      state.resume = action.payload.resume;
    },
    handleDeleteResume: (state, action) => {
      let resumes = [...state.resumes];
      resumes = resumes.filter((item) => item.id !== action.payload);
      state.resumes = resumes;
    },
  },
});

export const { setMyResumes, uppendResume, setResume, handleDeleteResume } =
  resumeSlice.actions;

export const getMyResumes = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/resume`);
    dispatch(setMyResumes({ resumes: res.data }));
  } catch (e) {
    alert("Something went wrong, Try later!");
  }
};
export const getResumeById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/resume/${id}`);
    dispatch(setResume({ resume: res.data }));
  } catch (e) {
    alert("Something went wrong, Try later!");
  }
};

export const createResume = (sendData, router) => async (dispatch) => {
  try {
    const res = await axios.post(`${END_POINT}/api/resume`, sendData);
    router.push("/resumes");
    dispatch(setMyResumes({ resumes: res.data }));
  } catch (e) {
    alert("Something went wrong, Try later!");
  }
};
export const editResume = (sendData, router) => async (dispatch) => {
  try {
    const res = await axios.put(`${END_POINT}/api/resume`, sendData);
    router.push("/resumes");
  } catch (e) {
    alert("Something went wrong, Try later!");
  }
};
export const deleteResume = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${END_POINT}/api/resume/${id}`);
    dispatch(handleDeleteResume(id));
  } catch (e) {
    alert("Something went wrong, Try later!");
  }
};

export default resumeSlice.reducer;
