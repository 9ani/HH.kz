import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/config/end-point";

export const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    resumes: [],
  },
  reducers: {
    setMyResumes: (state, action) => {
      state.resumes = action.payload.resumes;
    },
  },
});

export const { setMyResumes } = resumeSlice.actions;

export const getMyResumes = () => async (dispatch) => {
  try {
     const res = await axios.get(`${END_POINT}/api/resume`);
     dispatch(setMyResumes({resumes: res.data}))
  } catch (e) {
    alert("Something went wrong, Try later!")
  }
};

export const createResume = (sendData, router)=> async(dispatch)=>{
  try {
    const res = await axios.post(`${END_POINT}/api/resume`, sendData);
    router.push("/resumes")
    dispatch(setMyResumes({resumes: res.data}))
 } catch (e) {
   alert("Something went wrong, Try later!")
 }
}

export default resumeSlice.reducer;
