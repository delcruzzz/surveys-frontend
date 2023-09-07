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
  console.log(respondent);

  useEffect(() => {
    dispatch(fetchMunicipalities())
    dispatch(fetchNeighborhoods(respondent?.neighborhood.municipality.id))
  }, [dispatch, respondent?.neighborhood.municipality.id])

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
            defaultValue={respondent?.neighborhood.municipality.id}
            className='form-control'
          >
            {municipalities && municipalities.map((municipality) => (
              <option key={municipality.id}>{municipality.name}</option>
            ))}
          </select>
          <select
            defaultValue={respondent?.neighborhood.id}
            className='form-control'
            value={respondent?.neighborhood.id}
          >
            {
              municipalities.find((municipality) => municipality.id === respondent?.neighborhood.municipality.id)
                  ?.neighborhoods.map((neighborhood) => (
                    <option key={neighborhood.id}>{neighborhood.name}</option>
                  ))
            }
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
