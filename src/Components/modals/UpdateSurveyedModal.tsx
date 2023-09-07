import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useCustomDispatch, useCustomSelector } from '../../redux/hooks/useRedux';
import { setOpenModalUpdateRespondent } from '../../redux/slices/surveyedSlice';
import { useEffect } from 'react';
import { fetchMunicipalities } from '../../redux/thunks/municipalitiesThunk';
import { fetchNeighborhoods } from '../../redux/thunks/neighborhoodsThunk';

export const UpdateSurveyedModal = () => {
  const dispatch = useCustomDispatch();
  const { openModalUpdateRespondent, respondent } = useCustomSelector((state) => state.surveyed);
  const { municipalities } = useCustomSelector((state) => state.municipalities);
  const { neighborhoods } = useCustomSelector((state) => state.neighborhoods);

  useEffect(() => {
    dispatch(fetchMunicipalities())
    dispatch(fetchNeighborhoods(respondent.neighborhood.municipality.id))
  }, [dispatch, respondent.neighborhood.municipality.id])

  return (
    <Modal
      isOpen={openModalUpdateRespondent}
    >
      <ModalHeader>actualizar encuestado</ModalHeader>
      <ModalBody>
        <form className='d-flex flex-column gap-3'>
          <label htmlFor='name'>nombre</label>
          <input
            type='text'
            className='form-control'
            placeholder='nombre'
            defaultValue={respondent.name}
          />
          <label htmlFor='cellPhoneNumber'>celular</label>
          <input
            type='text'
            className='form-control'
            placeholder='telefono'
            defaultValue={respondent.phoneNumber}
          />
          <label htmlFor='identityCard'>cédula</label>
          <input
            type='text'
            className='form-control'
            placeholder='cédula'
            defaultValue={respondent.identityCard}
          />
          <label htmlFor='municipality'>municipio</label>
          <select
            defaultValue={respondent.neighborhood.municipality.id}
            className='form-control'
          >
            {municipalities && municipalities.map((municipality) => (
              <option key={municipality.id} value={municipality.id}>{municipality.name}</option>
            ))}
          </select>
          <label htmlFor='neighborhood'>barrio</label>
          <select
            defaultValue={respondent.neighborhood.id}
            className='form-control'
          >
            {neighborhoods && neighborhoods.map((neighborhood) => {
              return (
                <option key={neighborhood.id} value={neighborhood.id}>{neighborhood.name}</option>
              )
            })}
          </select>
          <label htmlFor='address'>dirección</label>
          <input
            type='text'
            className='form-control'
            placeholder='direccion'
            defaultValue={respondent.address}
          />
          <label htmlFor='votingMunicipality'>municipio de votación</label>
          <select
            defaultValue={respondent.votingTable.pollingStation.votingMunicipality.id}
            className='form-control'
          >
            <option></option>
          </select>
          <label htmlFor='pollingStation'>puesto de votación</label>
          <select
            defaultValue={respondent.votingTable.pollingStation.id}
            className='form-control'
          >
            <option></option>
          </select>
          <label htmlFor='votingTable'>mesa de votación</label>
          <select
            defaultValue={respondent.votingTable.id}
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
