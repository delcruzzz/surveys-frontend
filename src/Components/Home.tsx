import { FC } from 'react';
import './home.css';
import { useHistory } from 'react-router-dom';
import { TableSurveyed } from './TableSurveyed';
import { AuthUserResponse } from '../redux/interfaces/authInterface';

const Home: FC<JSX.Element[]> = () => {
  const history = useHistory();
  const userLogged: AuthUserResponse = JSON.parse(localStorage.getItem('user') || '{}');

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: 50,
          paddingRight: 50,
        }}
      >
        <div>
          <h3 className='m-3'>líder: {userLogged.name}</h3>
          <p className='m-3'>número de celular: {userLogged.cellPhoneNumber}</p>
          <p className='m-3'>C.C: {userLogged.identityCard}</p>
        </div>
        <div>
          <button type='submit' className='butn' onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div className='container'>
        <TableSurveyed />
      </div>
    </>
  );
};

export default Home;
