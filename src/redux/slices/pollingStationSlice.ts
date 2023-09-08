import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { pollingStationResponse, pollingStationState } from '../interfaces/pollingStationInterface';

const initialState: pollingStationState = {
  isLoading: false,
  pollingStations: [],
  pollingStation: {
    id: 0,
    name: '',
    votingTables: []
  },
}

const pollingStationsSlice = createSlice({
  name: 'pollingStations',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPollingStations: (state, action: PayloadAction<pollingStationResponse[]>) => {
      state.pollingStations = action.payload;
    },
    setPollingStation: (state, action: PayloadAction<pollingStationResponse>) => {
      state.pollingStation = action.payload;
    }
  }
})

export const { setLoading, setPollingStations, setPollingStation } = pollingStationsSlice.actions
export default pollingStationsSlice.reducer;
