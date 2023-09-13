import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useEffect, useState } from "react";
import { useCustomDispatch, useCustomSelector } from '../../redux/hooks/useRedux';
import { setOpenModalCreateRespondent } from '../../redux/slices/surveyedSlice';
import { useForm } from 'react-hook-form';
import { createSurveyed } from '../../redux/thunks/surveyedThunk';
import { fetchMunicipalities } from "../../redux/thunks/municipalitiesThunk";
import { fetchVotingTables } from '../../redux/thunks/votingTablesThunk';
import { fetchPollingStations } from '../../redux/thunks/pollingStationsThunk';
import { fetchNeighborhoods } from '../../redux/thunks/neighborhoodsThunk';

export const CreateSurveyedModal = () => {
  const dispatch = useCustomDispatch();
  const { municipalities } = useCustomSelector((state) => state.municipalities);
  const { votingMunicipalities } = useCustomSelector(
    (state) => state.votingMunicipalities
  );
  const { neighborhoods } = useCustomSelector((state) => state.neighborhoods)
  const { pollingStations } = useCustomSelector((state) => state.pollingStation)
  const { votingTables } = useCustomSelector((state) => state.votingTable)
  const { respondent } = useCustomSelector(
    (state) => state.surveyed
  );
  const [selectedPollingStationId, setSelectedPollingStationId] = useState(
    respondent?.votingTableId.pollingStation.id
  );
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState(
    respondent?.neighborhood.municipality.id
  );
  const [selectedVotingMunicipality, setSelectedVotingMunicipalityId] =
    useState(respondent?.votingTableId.pollingStation.votingMunicipality.id);
  const { openModalCreateRespondent } = useCustomSelector((state) => state.surveyed);
  useCustomSelector((state) => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log()

  const handleSubmitCreateRespondent = async (data: any, e: any) => {
    e.preventDefault();
    data = {
      ...data,
      phoneNumber: data.phoneNumber,
      neighborhoodId: Number(data.neighborhood),
      votingTable: data.votingTable
    }
    dispatch(createSurveyed(data))
    dispatch(setOpenModalCreateRespondent(false))
  }

  useEffect(() => {
    dispatch(fetchMunicipalities());
    dispatch(fetchVotingTables(selectedPollingStationId))
    dispatch(fetchNeighborhoods(selectedMunicipalityId))
    dispatch(fetchPollingStations(selectedVotingMunicipality))
  }, [dispatch, selectedPollingStationId, selectedMunicipalityId, selectedVotingMunicipality]);

  console.log({votingTables})
  console.log({neighborhoods})

  return (
    <Modal
      isOpen={openModalCreateRespondent}
    >
      <ModalHeader>Crear Encuestado</ModalHeader>
      <ModalBody>
        <form className='d-flex flex-column gap-3' onSubmit={handleSubmit(handleSubmitCreateRespondent)}>
          <label htmlFor='name'>Nombre</label>
          <input
            type='text'
            className='form-control'
            id='name'
            placeholder='Nombre'
            {...register('name', { required: 'Necesita un nombre...' })}
          />
          {errors.name && (
            <p className='text-danger' style={{ fontSize: 14 }}>
              {errors.name.message}
            </p>
          )}
          <label htmlFor='phoneNumber'>Celular</label>
          <input
            type='text'
            className='form-control'
            id='phoneNumber'
            placeholder='celular'
            {...register('phoneNumber', { required: 'Necesita un número de celular...' })}
          />
          {errors.phoneNumber && (
            <p className='text-danger' style={{ fontSize: 14 }}>
              {errors.phoneNumber.message}
            </p>
          )}
          <label htmlFor='identityCard'>Cédula</label>
          <input
            type='text'
            className='form-control'
            id='identityCard'
            placeholder='cédula'
            {...register('identityCard', { required: 'Necesita un número de cédula...' })}
          />
          {errors.identityCard && (
            <p className='text-danger' style={{ fontSize: 14 }}>
              {errors.identityCard.message}
            </p>
          )}
          <label htmlFor='municipality'>Municipio</label>
          <select
            defaultValue="Seleccione un municipio"
            className="form-control"
            id='municipality'
            {...register('municipality', { required: 'Necesita un municipio...' })}
            onChange={(e) =>
              setSelectedMunicipalityId(parseInt(e.target.value))
            }
          >
            {municipalities.length &&
              municipalities.map((municipality, i) => (
                <option key={i} value={municipality.id}>
                  {municipality.name}
                </option>
              ))}
          </select>
          <label htmlFor='neighborhood'>Barrio</label>
          <select
            defaultValue={"Seleccione un barrio"}
            className="form-control"
            id='neighborhood'
            {...register('neighborhood', { required: 'Necesita un barrio...' })}
            onChange={(e) => console.log(e.target.value)}
          >
            {neighborhoods.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
          </select>
          <label htmlFor='address'>Dirección</label>
          <input
            type='text'
            className='form-control'
            placeholder='dirección'
            id='address'
            {...register('address', { required: 'Necesita una dirección...' })}
          />
          {errors.address && (
            <p className='text-danger' style={{ fontSize: 14 }}>
              {errors.address.message}
            </p>
          )}
          <label htmlFor='votingMunicipality'>Municipio de Votación</label>
          <select
            defaultValue={
              ""
            }
            className="form-control"
            onChange={(e) =>
              setSelectedVotingMunicipalityId(parseInt(e.target.value))
            }
          >
            {votingMunicipalities.length &&
              votingMunicipalities.map((votingMunicipality, i) => (
                <option key={i} value={votingMunicipality.id}>
                  {votingMunicipality.name}
                </option>
              ))}
          </select>
          <label htmlFor='pollingStation'>Puesto de Votación</label>
          <select
            defaultValue={"Seleccione un puesto de votación"}
            className="form-control"
            id='pollingStation'
            {...register('pollingStation', { required: 'Necesita un puesto de votación...' })}
            onChange={
              (e) => setSelectedPollingStationId(parseInt(e.target.value))
            }
          >
            {pollingStations.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
          </select>
          <label htmlFor='votingTable'>Mesa de Votación</label>
          <select
            defaultValue={"Seleccione un puesto de votación"}
            className="form-control"
            id='votingTable'
            {...register('votingTable', { required: 'Necesita una mesa de votación...' })}
            onChange={(e) => console.log(e.target.value)}
          >
            {votingTables.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
          </select>
          <button className='btn btn-primary' type='submit'>agregar</button>
        </form>
      </ModalBody>
      <ModalFooter>
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
