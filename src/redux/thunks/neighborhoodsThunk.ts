import { setLoading, setNeighborhood, setNeighborhoods } from '../slices/neighborhoodsSlice';
import { Thunk } from '../store';
import apiConfig from '../../services/axios/axiosConfig';

export const fetchNeighborhoods = 
  (municipalityId: number | undefined): Thunk => 
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConfig.get(`/neighborhoods/neighborhoods-by-municipality/${municipalityId}`);
      const neighborhoods = response.data;
      dispatch(setNeighborhoods(neighborhoods));
      return response;
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  }

export const fetchNeighborhoodsById = 
  (id: number): Thunk => 
  async (dispatch) => {
    try {
      const response = await apiConfig.get(`/neighborhoods/${id}`);
      const neighborhood = response.data;
      dispatch(setNeighborhood(neighborhood));
      return response;
    } catch (error) {} finally {}
  }
