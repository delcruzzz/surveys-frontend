import { Redirect, Route } from 'react-router-dom';
import { AuthUserResponse } from '../redux/interfaces/authInterface';


const RoleProtectedRoute = (props:any) => {
  const token = localStorage.getItem('token')
  const userLogged: AuthUserResponse = JSON.parse(localStorage.getItem('user') || '{}')
  const validRole = (userLogged.roles.length && userLogged.roles.find((role) => role.name === 'SUPERADMIN'))

  if (!!(validRole && token)) {
    return <Redirect to='*' />
  } else if (!(validRole && token)) {
    return <><Route {...props} /></>
  } else {
    return <Redirect to='/login' />
  }

};

export default RoleProtectedRoute;
