import { Redirect, Route } from 'react-router-dom';
import { AuthJWTResponse } from '../redux/interfaces/authInterface';
import jwt_decode from "jwt-decode";

const RoleProtectedRoute = (props:any) => {
  const token = localStorage.getItem('auth') || '{}';

  try {
    const decode: AuthJWTResponse = jwt_decode(token);
    const validRole = decode.roles.find((role) => role.match('/SUPERADMIN'));

    if (validRole && token) {
      return <><Route {...props} /></>
    }
    return <Redirect to="*" />;
  } catch (error) {
    return <Redirect to="*" />;
  }
};

export default RoleProtectedRoute;
