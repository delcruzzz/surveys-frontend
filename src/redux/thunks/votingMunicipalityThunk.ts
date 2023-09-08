import axios from 'axios';
import { setLoading, setVotingMunicipalities, setVotingMunicipality } from '../slices/votingMunicipalitySlice';
import { Thunk } from '../store';
import { apiUrl } from '../../constants';
import { VotingMunicipalityResponse } from '../interfaces/votingMunicipalityInterface';

export const fetchVotingMunicipalityies =
  (): Thunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${apiUrl}/voting-municipalities`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth')}`
        }
      });
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
      const response = await axios.get(`${apiUrl}/voting-municipalities/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth')}`
        }
      });
      const votingMunicipality = response.data as VotingMunicipalityResponse;
      dispatch(setVotingMunicipality(votingMunicipality));
      return response;
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  }
