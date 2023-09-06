import { createSlice } from '@reduxjs/toolkit';

const surveyedSlice = createSlice({
  name: 'surveyed',
  initialState: {
    isLoading: false,
    surveyed: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSurveyed: (state, action) => {
      state.surveyed = action.payload;
    },
  }
});

export const { setLoading, setSurveyed } = surveyedSlice.actions;
export default surveyedSlice.reducer;
