import { Redirect, Route } from 'react-router-dom';
import { AuthJWTResponse } from '../redux/interfaces/authInterface';
import jwt_decode from "jwt-decode";

const RoleProtectedRoute = (props:any) => {
  const token = localStorage.getItem('auth') || '{}';

  try {
    const decode: AuthJWTResponse = jwt_decode(token);
    const validRole = decode.roles.find((role) => role === 'SUPERADMIN');
    console.table({roles: decode.roles})
    console.table(validRole)

    if (validRole) {
      return <><Route {...props} /></>
    }
    return <Redirect to="/" />;
  } catch (error) {
    return <Redirect to="*" />;
  }
};

export default RoleProtectedRoute;
