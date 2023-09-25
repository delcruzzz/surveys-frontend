import { FC } from 'react';
import './home.css';
import { Link, useHistory } from 'react-router-dom';
import { TableSurveyed } from './TableSurveyed';
import { AuthUserResponse } from '../redux/interfaces/authInterface';
import { useCustomDispatch } from '../redux/hooks/useRedux';
import { setOpenModalCreateRespondent } from '../redux/slices/surveyedSlice';
import { CreateSurveyedModal } from './modals/CreateSurveyedModal';

const Home: FC<JSX.Element[]> = () => {
  const dispatch = useCustomDispatch();
  const history = useHistory();
  const userLogged: AuthUserResponse = JSON.parse(localStorage.getItem('user') || '{}');

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  const validRole = userLogged.roles.find((role) => role.name === 'SUPERADMIN');

  return (
    <>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: 50,
          paddingRight: 50,
        }}
      >
        <div>
          <h2 className='m-3 '>
            <p style={{ fontSize: 18 }}>
              <b>Líder: {userLogged.name}, Télefono: {userLogged.cellPhoneNumber}, CC: {userLogged.identityCard}</b>
            </p>
          </h2>
        </div>
        <div>
          <button type='submit' className='butn' onClick={logout}>
            Cerrar Sesión
          </button>
        </div>
      </header>
      <main className='content-main'>
        <button 
          className='btn btn-success mb-3'
          onClick={() => dispatch(setOpenModalCreateRespondent(true))}
        >
          Agregar Votante
        </button>
        
        { 
          validRole 
            ? <Link to='/signup' className='btn btn-primary mb-3 mx-3'>Crear usuario</Link>
            : null  
        }
        <TableSurveyed />
      </main>
      <CreateSurveyedModal />
    </>
  );
};

export default Home;
