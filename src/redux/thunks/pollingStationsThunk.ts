import axios from 'axios';
import { setLoading, setPollingStations, setPollingStation } from '../slices/pollingStationSlice';
import { Thunk } from '../store';
import { apiUrl } from '../../constants';

export const fetchPollingStations =
  (votingMunicipalityId: number): Thunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${apiUrl}/polling-stations/polling-stations-by-voting-municipality/${votingMunicipalityId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth')}`
        }
      });
      const pollingStations = response.data;
      dispatch(setPollingStations(pollingStations));
      return response;
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  }

export const fetchPollingStationsById =
  (id: number): Thunk =>
  async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/polling-stations/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth')}`
        }
      });
      const pollingStation = response.data;
      dispatch(setPollingStation(pollingStation));
      return response;
    } catch (error) {} finally {}
  }
