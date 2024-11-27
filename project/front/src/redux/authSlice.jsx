// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"; 
const initialState = {
  token: Cookies.get('token') || null,
  teacherId: Cookies.get('teacherId') || null,
  teacherName: Cookies.get('teacherName') || null,
  teacherEmail: Cookies.get('teacherEmail') || null,
  universityName: Cookies.get('universityName') || null,
  role: Cookies.get('teacherRole') || null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.token = action.payload.token;
      state.teacherId = action.payload.teacherId;
      state.teacherName = action.payload.teacherName;
      state.teacherEmail = action.payload.teacherEmail;
      state.universityName = action.payload.universityName;
      state.role = action.payload.role;
      state.error = null;

      // Save token and user data in cookies
      Cookies.set('token', action.payload.token); 
      Cookies.set('teacherId', action.payload.teacherId);
      Cookies.set('teacherName', action.payload.teacherName);
      Cookies.set('teacherEmail', action.payload.teacherEmail);
      Cookies.set('universityName', action.payload.universityName);
      Cookies.set('teacherRole', action.payload.role);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearAuthData: (state) => {
      state.token = null;
      state.teacherId = null;
      state.teacherName = null;
      state.teacherEmail = null;
      state.universityName = null;
      state.role = null;
      state.error = null;

      // Remove cookies
      Cookies.remove('token');
      Cookies.remove('teacherId');
      Cookies.remove('teacherName');
      Cookies.remove('teacherEmail');
      Cookies.remove('universityName');
      Cookies.remove('teacherRole');
    },
  },
});

export const { setAuthData, setError, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
