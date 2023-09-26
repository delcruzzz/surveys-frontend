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
      <tr key={surveyed.id} className='mx-2 border-b-2'>
        <th scope="row" className="p-2 font-medium text-gray-900 whitespace-nowrap">{nameUser}</th>
        <td className="p-2 text-gray-600">{surveyed.name}</td>
        <td className="p-2 text-gray-600">{surveyed.phoneNumber}</td>
        <td className="p-2 text-gray-600">{surveyed.identityCard}</td>
        <td className="p-2 text-gray-600">{nameMunicipality}</td>
        <td className="p-2 text-gray-600">{nameNeighborhood}</td>
        <td className="p-2 text-gray-600">{surveyed.address}</td>
        <td className="p-2 text-gray-600">{nameVotingMunicipality}</td>
        <td className="p-2 text-gray-600">{namePollingStation}</td>
        <td className="p-2 text-gray-600">{nameVotingTable}</td>
        <td className="flex flex-col">
          <button
            className='m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => dispatch(fetchSurveyedById(surveyed.id))}
          >Editar</button>
          <button
            className='m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => dispatch(deleteSurveyed(surveyed.id))}
          >Eliminar</button>
        </td>
      </tr>
      <UpdateSurveyedModal />
    </>
  )
}
