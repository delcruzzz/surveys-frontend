import { setLoading, setVotingTables, setVotingTably } from '../slices/votingTableSlice';
import { Thunk } from '../store';
import apiConfig from '../../services/axios/axiosConfig';

export const fetchVotingTables =
  (pollingStationId: number): Thunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConfig.get(`voting-tables/voting-tables-by-polling-station/${pollingStationId}`);
      const votingTables = response.data;
      dispatch(setVotingTables(votingTables));
      return response;
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  }

export const fetchVotingTablesById =
  (id: number): Thunk =>
  async (dispatch) => {
    dispatch(setLoading(true))

    try {
      const response = await apiConfig.get(`/voting-tables/${id}`);
      const votingTable = response.data;
      dispatch(setVotingTably(votingTable));
      return response;
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  }
