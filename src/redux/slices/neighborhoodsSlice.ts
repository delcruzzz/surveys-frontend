import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NeighborhoodResponse, NeighborhoodState } from '../interfaces/neighborhoodsInterface';

const initialState: NeighborhoodState = {
  isLoading: false,
  neighborhoods: [],
  neighborhood: null,
}

const neighborhoodsSlice = createSlice({
  name: 'neighborhoods',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setNeighborhoods: (state, action: PayloadAction<NeighborhoodResponse[]>) => {
      state.neighborhoods = action.payload;
    },
    setNeighborhood: (state, action: PayloadAction<NeighborhoodResponse>) => {
      state.neighborhood = action.payload;
    }
  }
})

export const { setLoading, setNeighborhoods, setNeighborhood } = neighborhoodsSlice.actions
export default neighborhoodsSlice.reducer;
