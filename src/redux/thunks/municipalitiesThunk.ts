import axios from 'axios';
import { setLoading, setMunicipalities, setMunicipality } from '../slices/municipalitiesSlice';
import { Thunk } from '../store';
import { apiUrl } from '../../constants';

export const fetchMunicipalities = 
  (): Thunk => 
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${apiUrl}/municipalities`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth')}`
        }
      });
      const municipalities = response.data;
      dispatch(setMunicipalities(municipalities));
      return response;
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  }