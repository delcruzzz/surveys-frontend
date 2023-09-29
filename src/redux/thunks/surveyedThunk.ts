import { AxiosError, AxiosResponse } from 'axios';
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
import { toast } from 'react-toastify';
import apiConfig from '../../services/axios/axiosConfig';

export const fetchSurveyed = 
  (): Thunk => 
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const userLogged = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await apiConfig.get(`${apiUrl}/surveyed/surveyed-by-user/${userLogged.id}`);
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
      const response = await apiConfig.get(`${apiUrl}/surveyed/${id}`);
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

      const response = await apiConfig.post(`/surveyed`, surveyed);

      const respondent = response.data as SurveyedResponse;
      dispatch(updateListSurveyed(respondent));
      toast.success('Encuestado creado con éxito');
      return response as AxiosResponse;
    } catch (error) {
      toast.error('Hubo un error al crear el encuestado');
      return error as AxiosError;
    } finally {
      dispatch(setLoading(false));
    }
  }


export const updateSurveyed =
  (surveyed: UpdateSurveyed, surveyedId: number): Thunk =>
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
        votingTable: surveyed.votingTable,
      }

      const response = await apiConfig.put(`/surveyed/${surveyedId}`, surveyed);

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
      const response = apiConfig.delete(`/surveyed/${respondentId}`);

      const respondent = (await response).data as SurveyedResponse;

      dispatch(updateListSurveyedAfterDelete(respondent))

      return response;
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  }
