import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';
import axios, { AxiosError } from 'axios';
import { apiUrl } from '../../constants';
import { AuthUserResponse } from '../interfaces/authInterface';
import { toast } from 'react-toastify';

export const loginUser = (data: any) => async (dispatch: any) => {
  dispatch(loginStart());

  try {
    const params = {
      identityCard: data.identityCard,
      password: data.password,
    };

    const response = await axios.post(`${apiUrl}/auth/login`, params, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    if (response.data.success === false) {
      dispatch(loginFailure(response.data.error));
    } else {
      localStorage.setItem('auth', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      dispatch(loginSuccess(response.data as AuthUserResponse));
      toast.success('Bienvenido', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return response
    }
  } catch (error: any) {
    dispatch(loginFailure('Hubo un error en la autenticación'));
    toast.error('Hubo un error en la autenticación', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    return error as AxiosError;
  }
};
