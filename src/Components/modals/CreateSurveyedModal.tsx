import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useCustomDispatch, useCustomSelector } from '../../redux/hooks/useRedux';
import { setOpenModalCreateRespondent } from '../../redux/slices/surveyedSlice';

export const CreateSurveyedModal = () => {
  const dispatch = useCustomDispatch();
  const { openModalCreateRespondent } = useCustomSelector((state) => state.surveyed);

  return (
    <Modal
      isOpen={openModalCreateRespondent}
    >
      <ModalHeader>crear encuestado</ModalHeader>
      <ModalBody>
        <form className='d-flex flex-column gap-3'>
          <label htmlFor='name'>nombre</label>
          <input
            type='text'
            className='form-control'
            id='name'
            placeholder='nombre'
          />
          <label htmlFor='cellPhoneNumber'>celular</label>
          <input
            type='text'
            className='form-control'
            id='cellPhoneNumber'
            placeholder='celular'
          />
          <label htmlFor='identityCard'>cédula</label>
          <input
            type='text'
            className='form-control'
            id='identityCard'
            placeholder='cédula'
          />
          <label htmlFor='municipality'>municipio</label>
          <select className='form-select' aria-label='Default select example'>
            <option selected>seleccione un municipio</option>
          </select>
          <label htmlFor='neighborhood'>barrio</label>
          <select className='form-select' aria-label='Default select example'>
            <option></option>
          </select>
          <label htmlFor='address'>dirección</label>
          <input
            type='text'
            className='form-control'
            placeholder='dirección'
          />
          <label htmlFor='votingMunicipality'>municipio de votación</label>
          <select
            className='form-control'
          >
            <option></option>
          </select>
          <label htmlFor='pollingStation'>puesto de votación</label>
          <select
            className='form-control'
          >
            <option></option>
          </select>
          <label htmlFor='votingTable'>mesa de votación</label>
          <select
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
          onClick={() => dispatch(setOpenModalCreateRespondent(false))}
        >
          cancelar
        </button>
      </ModalFooter>
    </Modal>
  )
};
