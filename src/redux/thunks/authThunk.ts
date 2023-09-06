// authThunks.js
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';
import axios from 'axios';

export const loginUser = (data: any) => async (dispatch: any) => {
  dispatch(loginStart());

  try {
    const params = {
      identityCard: data.identityCard,
      password: data.password,
    };

    const response = await axios.post('http://localhost:3000/api/auth/login', params);

    if (response.data.success === false) {
      dispatch(loginFailure(response.data.error));
    } else {
      localStorage.setItem('auth', response.data.token);
      dispatch(loginSuccess(response.data));
      console.log(response.data)
    }
  } catch (error) {
    console.error(error);
    dispatch(loginFailure('Hubo un error en la autenticación'));
  }
};
