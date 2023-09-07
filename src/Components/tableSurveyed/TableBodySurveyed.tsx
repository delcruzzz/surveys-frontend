import { SurveyedResponse } from '../../redux/interfaces/surveyedInterface';
type TableBodySurveyedProps = {
  surveyed: SurveyedResponse
}

export const TableBodySurveyed = ({ surveyed }: TableBodySurveyedProps) => {
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
      <td className=''>
        <button className='btn btn-primary mb-2'>Editar</button>
        <button className='btn btn-danger'>Eliminar</button>
      </td>
    </tr>
  )
}
