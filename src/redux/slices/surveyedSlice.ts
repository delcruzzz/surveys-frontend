import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SurveyedResponse, SurveyedState } from '../interfaces/surveyedInterface';

const initialState: SurveyedState = {
  isLoading: false,
  surveyed: [],
  respondent: {
    id: 0,
    name: '',
    phoneNumber: '',
    identityCard: '',
    address: '',
    neighborhood: {
      id: 0,
      name: '',
      municipality: {
        id: 0,
        name: '',
      }
    },
    user: {
      id: 0,
      name: '',
      identityCard: '',
    },
    votingTableId: {
      id: 0,
      name: '',
      pollingStation: {
        id: 0,
        name: '',
        votingMunicipality: {
          id: 0,
          name: '',
        }
      }
    }
  },
  openModalUpdateRespondent: false,
  openModalCreateRespondent: false,
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
    selectedRespondent: (state, action: PayloadAction<SurveyedResponse>) => {
      state.respondent = action.payload;
    },
    setOpenModalUpdateRespondent: (state, action: PayloadAction<boolean>) => {
      state.openModalUpdateRespondent = action.payload;
    },
    setOpenModalCreateRespondent: (state, action: PayloadAction<boolean>) => {
      state.openModalCreateRespondent = action.payload;
    },
    updateListSurveyed: (state, action: PayloadAction<SurveyedResponse>) => {
      state.surveyed = [...state.surveyed, action.payload]
    },
    updateListSurveyedAction: (state, action: PayloadAction<SurveyedResponse>) => {
      const updateSurveyed = action.payload;
      const existingSurveyedIndex = state.surveyed.findIndex(respondent => respondent.id === updateSurveyed.id);
      state.surveyed.splice(existingSurveyedIndex, 1, updateSurveyed);
    },
    updateListSurveyedAfterDelete: (state, action: PayloadAction<SurveyedResponse>) => {
      const respondent = action.payload.id;
      state.surveyed = state.surveyed.filter((e) => e.id !== respondent);
    }
  }
});

export const {
  setLoading,
  setSurveyed,
  selectedRespondent,
  setOpenModalUpdateRespondent,
  setOpenModalCreateRespondent,
  updateListSurveyed,
  updateListSurveyedAction,
  updateListSurveyedAfterDelete,
} = surveyedSlice.actions;
export default surveyedSlice.reducer;
