import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTeacherDetails = createAsyncThunk(
  'teacher/fetchTeacherDetails',
  async (id) => {
    const response = await axios.get(`http://localhost:3000/api/TeacherDetails/${id}`);
    return response.data;
  }
);

export const submitConsultationRequest = createAsyncThunk(
  'teacher/submitConsultationRequest',
  async ({ consultant_id, request_type, description, file_url }) => {
    const response = await axios.post('http://localhost:3000/api/consultation-requests', {
      consultant_id,
      request_type,
      description,
      file_url,
    });
    return response.data;
  }
);

const teacherSlice = createSlice({
  name: 'teacher',
  initialState: {
    teacher: null,
    loading: false,
    error: null,
    submissionStatus: '',
  },
  reducers: {
    clearSubmissionStatus: (state) => {
      state.submissionStatus = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeacherDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.teacher = action.payload;
      })
      .addCase(fetchTeacherDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitConsultationRequest.pending, (state) => {
        state.submissionStatus = 'pending';
      })
      .addCase(submitConsultationRequest.fulfilled, (state) => {
        state.submissionStatus = 'success';
      })
      .addCase(submitConsultationRequest.rejected, (state, action) => {
        state.submissionStatus = 'error';
        state.error = action.error.message;
      });
  },
});

export const { clearSubmissionStatus } = teacherSlice.actions;
export default teacherSlice.reducer;
