import axios from 'axios';
import { setLoading, setVotingTables, setVotingTably } from '../slices/votingTableSlice';
import { Thunk } from '../store';
import { apiUrl } from '../../constants';

export const fetchVotingTables =
  (pollingStationId: number): Thunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${apiUrl}/voting-tables/voting-tables-by-polling-station/${pollingStationId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth')}`,
          'Access-Control-Allow-Origin': '*'
        }
      });
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
      const response = await axios.get(`${apiUrl}/voting-tables/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth')}`,
          'Access-Control-Allow-Origin': '*'
        }
      });
      const votingTable = response.data;
      dispatch(setVotingTably(votingTable));
      return response;
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  }
