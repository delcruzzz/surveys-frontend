import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { VotingMunicipalityResponse, VotingMunicipalityState } from '../interfaces/votingMunicipalityInterface';

const initialState: VotingMunicipalityState = {
  isLoading: false,
  votingMunicipalities: [],
  votingMunicipality: {
    id: 0,
    name: '',
    pollingStations: [],
    votingTable: [],
  },
}

const votingMunicipalitiesSlice = createSlice({
  name: 'votingMunicipalities',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setVotingMunicipalities: (state, action: PayloadAction<VotingMunicipalityResponse[]>) => {
      state.votingMunicipalities = action.payload;
    },
    setVotingMunicipality: (state, action: PayloadAction<VotingMunicipalityResponse>) => {
      state.votingMunicipality = action.payload;
    }
  }
});

export const { setLoading, setVotingMunicipalities, setVotingMunicipality } = votingMunicipalitiesSlice.actions
export default votingMunicipalitiesSlice.reducer;
