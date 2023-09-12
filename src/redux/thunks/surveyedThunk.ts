import axios from 'axios';
import { 
  selectedRespondent, 
  setLoading, 
  setSurveyed, 
  updateListSurveyed, 
  setOpenModalUpdateRespondent, 
  updateListSurveyedAction,
  updateListSurveyedAfterDelete
} from '../slices/surveyedSlice';
import { Thunk } from '../store';
import { apiUrl } from '../../constants';
import { CreateSurveyed, SurveyedResponse, UpdateSurveyed } from '../interfaces/surveyedInterface';
import { addMessage } from '../slices/uiSlice';

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
      const surveyed = response.data as SurveyedResponse[];
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
      const userLogged = JSON.parse(localStorage.getItem('user') || '{}');
      surveyed = {
        address: surveyed.address,
        identityCard: surveyed.identityCard,
        name: surveyed.name,
        phoneNumber: surveyed.phoneNumber,
        userId: userLogged.id,
        neighborhoodId: surveyed.neighborhoodId,
        votingTable: surveyed.votingTable
      }
      console.log({"surveyedCreate": surveyed})

      const response = await axios.post(`${apiUrl}/surveyed`, surveyed, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth')}`
        }
      });

      const respondent = response.data as SurveyedResponse;
      dispatch(updateListSurveyed(respondent));
      dispatch(addMessage({
        message: 'Encuestado creado con éxito',
        variant: 'success',
      }))
      return response;
    } catch (error) {
      dispatch(addMessage({
        message: 'Error al crear el encuestado',
        variant: 'error',
      }))
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  }


export const updateSurveyed =
  (surveyed: UpdateSurveyed, surveyedId: number): Thunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    const userLogged = JSON.parse(localStorage.getItem('user') || '{}');
    surveyed = {
      address: surveyed.address,
      identityCard: surveyed.identityCard,
      name: surveyed.name,
      phoneNumber: surveyed.phoneNumber,
      userId: userLogged.id,
      neighborhoodId: surveyed.neighborhoodId,
      votingTable: surveyed.votingTable,
    }

    console.log({"surveyedBeforePut": surveyed})

    try {
      const response = await axios.put(`${apiUrl}/surveyed/${surveyedId}`, surveyed, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth')}`
        }
      });

      const respondent = response.data as SurveyedResponse;

      dispatch(updateListSurveyedAction(respondent));
      return response
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoading(false))
    }
  }

export const deleteSurveyed =
  (respondentId: number): Thunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    window.location.replace('');

    try {
      const response = axios.delete(`${apiUrl}/surveyed/${respondentId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth')}`
        }
      });

      const respondent = (await response).data as SurveyedResponse;

      dispatch(updateListSurveyedAfterDelete(respondent))

      return response;
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  }
