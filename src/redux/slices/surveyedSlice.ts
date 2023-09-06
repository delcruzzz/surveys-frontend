import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SurveyedResponse, SurveyedState } from '../interfaces/surveyedInterface';

const initialState: SurveyedState = {
  isLoading: false,
  surveyed: [],
}

const surveyedSlice = createSlice({
  name: 'surveyed',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSurveyed: (state, action: PayloadAction<SurveyedResponse[]>) => {
      state.surveyed = action.payload;
    },
  }
});

export const { setLoading, setSurveyed } = surveyedSlice.actions;
export default surveyedSlice.reducer;
