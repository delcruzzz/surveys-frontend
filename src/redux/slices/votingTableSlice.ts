import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { VotingTableResponse, VotingTableState } from '../interfaces/votingTableInterface';

const initialState: VotingTableState = {
  isLoading: false,
  votingTables: [],
  votingTably: {
    id: 0,
    name: '',
    votingTables: [],
  },
}

const votingTablesSlice = createSlice({
  name: 'votingTables',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setVotingTables: (state, action: PayloadAction<VotingTableResponse[]>) => {
      state.votingTables = action.payload;
    },
    setVotingTably: (state, action: PayloadAction<VotingTableResponse>) => {
      state.votingTably = action.payload;
    }
  }
});

export const { setLoading, setVotingTables, setVotingTably } = votingTablesSlice.actions
export default votingTablesSlice.reducer;
