import { useEffect } from 'react';
import { useCustomDispatch, useCustomSelector } from '../redux/hooks/useRedux';
import { fetchSurveyed } from '../redux/thunks/surveyedThunk';

export const TableSurveyed = () => {
  const { surveyed } = useCustomSelector((state) => state.surveyed);
  const dispatch = useCustomDispatch();

  useEffect(() => {
    dispatch(fetchSurveyed())
  }, [dispatch])

  return (
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
  )
}
