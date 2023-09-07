import axios from 'axios';
import { selectedRespondent, setLoading, setOpenModalCreateRespondent, setOpenModalUpdateRespondent, setSurveyed, updateListSureveyed } from '../slices/surveyedSlice';
import { Thunk } from '../store';
import { apiUrl } from '../../constants';
import { CreateSurveyed, SurveyedResponse } from '../interfaces/surveyedInterface';

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

export const fetchSurveyedById = 
  (id: number): Thunk => 
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${apiUrl}/surveyed/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth')}`
        }
      });
      const respondent = response.data as SurveyedResponse;
      console.log(respondent)
      dispatch(selectedRespondent(respondent));
      dispatch(setOpenModalUpdateRespondent(true));
      return response;
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  }

export const createSurveyed = 
  (surveyed: CreateSurveyed): Thunk => 
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`${apiUrl}/surveyed`, surveyed, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth')}`
        }
      });

      const respondent = response.data as SurveyedResponse;
      dispatch(updateListSureveyed(respondent));
      dispatch(setOpenModalCreateRespondent(true));
      return response;
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  }
