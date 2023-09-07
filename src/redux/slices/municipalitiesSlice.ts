import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MunicipalityResponse, MunicipalityState } from '../interfaces/municipalitiesInterface';

const initialState: MunicipalityState = {
  isLoading: false,
  municipalities: [],
  municipality: {
    id: 0,
    name: '',
    neighborhoods: [],
  },
}

const municipalitiesSlice = createSlice({
  name: 'municipalities',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMunicipalities: (state, action: PayloadAction<MunicipalityResponse[]>) => {
      state.municipalities = action.payload;
    },
    setMunicipality: (state, action: PayloadAction<MunicipalityResponse>) => {
      state.municipality = action.payload;
    }
  }
});

export const { setLoading, setMunicipalities, setMunicipality } = municipalitiesSlice.actions
export default municipalitiesSlice.reducer;
