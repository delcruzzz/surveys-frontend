import { setLoading, setPollingStations, setPollingStation } from '../slices/pollingStationSlice';
import { Thunk } from '../store';
import apiConfig from '../../services/axios/axiosConfig';

export const fetchPollingStations =
  (votingMunicipalityId: number): Thunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConfig.get(`/polling-stations/polling-stations-by-voting-municipality/${votingMunicipalityId}`);
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
      const response = await apiConfig.get(`/polling-stations/${id}`);
      const pollingStation = response.data;
      dispatch(setPollingStation(pollingStation));
      return response;
    } catch (error) {} finally {}
  }
