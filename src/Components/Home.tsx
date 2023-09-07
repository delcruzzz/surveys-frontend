import React, { FC, useEffect } from 'react';
import './home.css';
import { useCustomDispatch, useCustomSelector } from '../redux/hooks/useRedux';
import { fetchSurveyed } from '../redux/thunks/surveyedThunk';
import { useHistory } from 'react-router-dom';

const Home: FC<JSX.Element[]> = () => {
  const dispatch = useCustomDispatch();
  const history = useHistory();
  const { surveyed } = useCustomSelector((state) => state.surveyed);

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  useEffect(() => {
    dispatch(fetchSurveyed())
  }, [dispatch])

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
          <h3 className='m-3'>INICIO</h3>
        </div>
        <div>
          <button type='submit' className='butn' onClick={logout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
      <div className='container'>
        <table className='table'>
          <thead>
            <tr>
              <th>lider</th>
              <th>nombre</th>
              <th>telefono</th>
              <th>cédula</th>
              <th>municipio</th>
              <th>barrio</th>
              <th>dirección</th>
              <th>municipio de votación</th>
              <th>puesto de votación</th>
              <th>mesa de votación</th>
              <th>acciones</th>
            </tr>
          </thead>
          <tbody>
            {surveyed && surveyed.map((surveyed) => {

              return (
                <tr key={surveyed.id}>
                  <td>{surveyed.user.name}</td>
                  <td>{surveyed.name}</td>
                  <td>{surveyed.phoneNumber}</td>
                  <td>{surveyed.identityCard}</td>
                  <td>{surveyed.neighborhood.municipality.name}</td>
                  <td>{surveyed.neighborhood.name}</td>
                  <td>{surveyed.address}</td>
                  <td>{surveyed.votingTable.pollingStation.votingMunicipality.name}</td>
                  <td>{surveyed.votingTable.pollingStation.name}</td>
                  <td>{surveyed.votingTable.name}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {JSON.stringify(surveyed)}
      </div>
    </>
  );
};

export default Home;
