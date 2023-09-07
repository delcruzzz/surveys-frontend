import axios from 'axios';
import { setLoading, setMunicipalities, setMunicipality } from '../slices/municipalitiesSlice';
import { Thunk } from '../store';
import { apiUrl } from '../../constants';
import { MunicipalityResponse } from '../interfaces/municipalitiesInterface';

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
      const municipalities = response.data as MunicipalityResponse[];
      dispatch(setMunicipalities(municipalities));
      return response;
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  }

export const fetchMunicipalitiesById = 
  (id: number): Thunk => 
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${apiUrl}/municipalities/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth')}`
        }
      });
      const municipality = response.data as MunicipalityResponse;
      dispatch(setMunicipality(municipality));
      return response;
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  }
