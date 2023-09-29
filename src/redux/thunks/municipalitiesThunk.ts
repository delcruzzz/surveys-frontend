import { setLoading, setMunicipalities, setMunicipality } from '../slices/municipalitiesSlice';
import { Thunk } from '../store';
import { MunicipalityResponse } from '../interfaces/municipalitiesInterface';
import apiConfig from '../../services/axios/axiosConfig';

export const fetchMunicipalities = 
  (): Thunk => 
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConfig.get(`/municipalities`);
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
      const response = await apiConfig.get(`/municipalities/${id}`);
      const municipality = response.data as MunicipalityResponse;
      dispatch(setMunicipality(municipality));
      return response;
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  }
