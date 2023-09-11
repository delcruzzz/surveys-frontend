import { useCustomDispatch } from '../../redux/hooks/useRedux';
import { SurveyedResponse } from '../../redux/interfaces/surveyedInterface';
import { deleteSurveyed, fetchSurveyedById } from '../../redux/thunks/surveyedThunk';
import { UpdateSurveyedModal } from '../modals/UpdateSurveyedModal';
type TableBodySurveyedProps = {
  surveyed: SurveyedResponse
}

export const TableBodySurveyed = ({ surveyed }: TableBodySurveyedProps) => {
  const dispatch = useCustomDispatch();

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
  } = surveyed.votingTableId;

  return (
    <>
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
        <td className='text-center'>
          <button
            className='btn btn-primary mb-2'
            onClick={() => dispatch(fetchSurveyedById(surveyed.id))}
          >Editar</button>
          <button
            className='btn btn-danger'
            onClick={() => dispatch(deleteSurveyed(surveyed.id))}
          >Eliminar</button>
        </td>
      </tr>
      <UpdateSurveyedModal />
    </>
  )
}
