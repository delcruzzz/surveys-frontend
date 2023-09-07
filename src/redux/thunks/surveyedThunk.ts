import axios from 'axios';
import { setLoading, setSurveyed } from '../slices/surveyedSlice';
import { Thunk } from '../store';
import { apiUrl } from '../../constants';

export const fetchSurveyed = 
  (): Thunk => 
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const userLogged = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await axios.get(`${apiUrl}/surveyed/surveyed-by-user/${userLogged.id}`, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth')}`
        }
      });
      const surveyed = response.data;
      console.log(surveyed);
      dispatch(setSurveyed(surveyed));
      return response;
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  }
