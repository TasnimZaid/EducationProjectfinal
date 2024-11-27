// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import teacherReducer from './teacherSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    teacher: teacherReducer,

  },
});

export default store;
