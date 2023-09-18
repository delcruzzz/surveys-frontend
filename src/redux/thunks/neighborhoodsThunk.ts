import axios from 'axios';
import { setLoading, setNeighborhood, setNeighborhoods } from '../slices/neighborhoodsSlice';
import { Thunk } from '../store';
import { apiUrl } from '../../constants';

export const fetchNeighborhoods = 
  (municipalityId: number | undefined): Thunk => 
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${apiUrl}/neighborhoods/neighborhoods-by-municipality/${municipalityId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth')}`,
          'Access-Control-Allow-Origin': '*'
        }
      });
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
      const response = await axios.get(`${apiUrl}/neighborhoods/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth')}`,
          'Access-Control-Allow-Origin': '*'
        }
      });
      const neighborhood = response.data;
      dispatch(setNeighborhood(neighborhood));
      return response;
    } catch (error) {} finally {}
  }
