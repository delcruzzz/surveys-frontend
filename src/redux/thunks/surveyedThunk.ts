import axios from 'axios';
import { setLoading, setSurveyed } from '../slices/surveyedSlice';
import { Thunk } from '../store';

export const fetchSurveyed = 
  (): Thunk => 
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get('http://localhost:3000/api/surveyed', {
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
