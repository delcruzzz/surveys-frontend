// authThunks.js
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';
import axios from 'axios';
import { apiUrl } from '../../constants';

export const loginUser = (data: any) => async (dispatch: any) => {
  dispatch(loginStart());

  try {
    const params = {
      identityCard: data.identityCard,
      password: data.password,
    };

    const response = await axios.post(`${apiUrl}/auth/login`, params);

    if (response.data.success === false) {
      dispatch(loginFailure(response.data.error));
    } else {
      localStorage.setItem('auth', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      dispatch(loginSuccess(response.data));
      return response
    }
  } catch (error) {
    console.error(error);
    dispatch(loginFailure('Hubo un error en la autenticación'));
  }
};
