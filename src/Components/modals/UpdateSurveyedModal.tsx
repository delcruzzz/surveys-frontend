import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useCustomDispatch, useCustomSelector } from '../../redux/hooks/useRedux';
import { setOpenModalUpdateRespondent } from '../../redux/slices/surveyedSlice';

export const UpdateSurveyedModal = () => {
  const dispatch = useCustomDispatch();
  const { openModalUpdateRespondent, respondent } = useCustomSelector((state) => state.surveyed);
  console.log(respondent);

  return (
    <Modal
      isOpen={openModalUpdateRespondent}
    >
      <ModalHeader>actualizar encuestado</ModalHeader>
      <ModalBody>
        <form className='d-flex flex-column gap-3'>
          <input 
            type='text'
            className='form-control'
            placeholder='nombre'
            defaultValue={respondent?.name}
          />
          <input
            type='text'
            className='form-control'
            placeholder='telefono'
            defaultValue={respondent?.phoneNumber}
          />
          <input
            type='text'
            className='form-control'
            placeholder='cedula'
            defaultValue={respondent?.identityCard}
          />
          <select
            defaultValue={respondent?.neighborhood.municipality.name}
            className='form-control'
          >
            <option></option>
          </select>
          <select
            defaultValue={respondent?.neighborhood.name}
            className='form-control'
          >
            <option></option>
          </select>
          <input
            type='text'
            className='form-control'
            placeholder='direccion'
            defaultValue={respondent?.address}
          />
          <select
            defaultValue={respondent?.votingTable.pollingStation.votingMunicipality.name}
            className='form-control'
          >
            <option></option>
          </select>
          <select
            defaultValue={respondent?.votingTable.pollingStation.name}
            className='form-control'
          >
            <option></option>
          </select>
          <select
            defaultValue={respondent?.votingTable.name}
            className='form-control'
          >
            <option></option>
          </select>
        </form>
      </ModalBody>
      <ModalFooter>
        <button className='btn btn-primary'>actualizar</button>
        <button 
          className='btn btn-danger'
          onClick={() => dispatch(setOpenModalUpdateRespondent(false))}
        >
          cancelar
        </button>
      </ModalFooter>
    </Modal>
  )
};
