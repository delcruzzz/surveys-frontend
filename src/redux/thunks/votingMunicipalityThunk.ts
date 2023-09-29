import { setLoading, setVotingMunicipalities, setVotingMunicipality } from '../slices/votingMunicipalitySlice';
import { Thunk } from '../store';
import { VotingMunicipalityResponse } from '../interfaces/votingMunicipalityInterface';
import apiConfig from '../../services/axios/axiosConfig';

export const fetchVotingMunicipalities =
  (): Thunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConfig.get(`/voting-municipalities`);
      const votingMunicipalities = response.data as VotingMunicipalityResponse[];
      dispatch(setVotingMunicipalities(votingMunicipalities));
      return response;
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  }

export const fetchVotingMunicipalityiesById =
  (id: number): Thunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConfig.get(`/voting-municipalities/${id}`);
      const votingMunicipality = response.data as VotingMunicipalityResponse;
      dispatch(setVotingMunicipality(votingMunicipality));
      return response;
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  }
