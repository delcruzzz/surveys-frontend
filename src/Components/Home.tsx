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
          <h3 className='m-3'>Home</h3>
        </div>
        <div>
          <button type='submit' className='butn' onClick={logout}>
            Logout
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
              const { name: nameUser } = surveyed.user;
              const {
                name: nameNeighborhood,
                municipality: {
                  name: nameMunicipality
                }
              } = surveyed.neighborhood;
              const {
                name: nameVotingTable,
                pollingStation: {
                  name: namePollingStation,
                  votingMunicipality: {
                    name: nameVotingMunicipality
                  }
                }
              } = surveyed.votingTable;

              return (
                <tr key={surveyed.id}>
                  <td>{nameUser}</td>
                  <td>{surveyed.name}</td>
                  <td>{surveyed.phoneNumber}</td>
                  <td>{surveyed.identityCard}</td>
                  <td>{nameMunicipality}</td>
                  <td>{nameNeighborhood}</td>
                  <td>{surveyed.address}</td>
                  <td>{nameVotingMunicipality}</td>
                  <td>{namePollingStation}</td>
                  <td>{nameVotingTable}</td>
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
