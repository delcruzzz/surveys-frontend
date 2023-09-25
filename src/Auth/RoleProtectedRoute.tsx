import { Redirect, Route } from 'react-router-dom';
import { AuthUserResponse } from '../redux/interfaces/authInterface';

const RoleProtectedRoute = (props:any) => {
  // const isAuth  = false

  const user = localStorage.getItem('user')
  const token = localStorage.getItem('token')
  const userLogged: AuthUserResponse = JSON.parse(user || '{}')

  const validRole = userLogged.roles.find((role) => role.name === 'SUPERADMIN')


  return <>{(validRole || token) ? <Route {...props} /> : <Redirect to='/' />}</>;

};

export default RoleProtectedRoute;
