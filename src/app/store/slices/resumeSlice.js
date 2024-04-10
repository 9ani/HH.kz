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
     const resumes = await axios.get(`${END_POINT}/api/resumes`);
     dispatch(setMyResumes(resumes))
  } catch (e) {
    alert("Something went wrong, Try later!")
  }
};

export default resumeSlice.reducer;
