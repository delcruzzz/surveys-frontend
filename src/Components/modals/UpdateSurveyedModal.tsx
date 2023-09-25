import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  useCustomDispatch,
  useCustomSelector,
} from "../../redux/hooks/useRedux";
import { setOpenModalUpdateRespondent } from "../../redux/slices/surveyedSlice";
import { useEffect, useState } from "react";
import { fetchMunicipalities } from "../../redux/thunks/municipalitiesThunk";
import { fetchNeighborhoods } from "../../redux/thunks/neighborhoodsThunk";
import { fetchVotingMunicipalities } from "../../redux/thunks/votingMunicipalityThunk";
import { fetchPollingStations } from "../../redux/thunks/pollingStationsThunk";
import { fetchVotingTables } from "../../redux/thunks/votingTablesThunk";
import { useForm } from 'react-hook-form';
import { updateSurveyed } from "../../redux/thunks/surveyedThunk";

export const UpdateSurveyedModal = () => {
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
  
  const [selectedVotingTableId, setSelectedVotingTableId] = useState(
    respondent?.votingTableId.id
  );
  const [selectedNeighborhoodId, setSelectedNeighborhoodId] = useState(
    respondent?.neighborhood.id
  );
  const { openModalUpdateRespondent } = useCustomSelector((state) => state.surveyed);
  useCustomSelector((state) => state.auth)
  const {
    register,
    handleSubmit,
  } = useForm();

  const handleSubmitUpdateForm = async (data: any, e: any) => {
    e.preventDefault();
    data = {
      ...data,
      phoneNumber: data.phoneNumber,
      neighborhoodId: Number(data.neighborhood),
      votingTable: data.votingTable
    }
    await dispatch(updateSurveyed(data, respondent.id))
    dispatch(setOpenModalUpdateRespondent(false))
    window.location.replace('');
  }

  const handleCancelUpdate = () => {
    dispatch(setOpenModalUpdateRespondent(false))
    window.location.replace('')
  }

  useEffect(() => {
    dispatch(fetchMunicipalities());
    dispatch(fetchVotingTables(selectedPollingStationId || respondent.votingTableId.pollingStation.id))
    dispatch(fetchNeighborhoods(selectedMunicipalityId || respondent.neighborhood.municipality.id))
    dispatch(fetchPollingStations(selectedVotingMunicipality || respondent.votingTableId.pollingStation.votingMunicipality.id))
    dispatch(fetchVotingMunicipalities())
  }, [
    dispatch, 
    selectedPollingStationId, 
    selectedMunicipalityId, 
    selectedVotingMunicipality,
    respondent.neighborhood.municipality.id,
    respondent.votingTableId.pollingStation.id,
    respondent.votingTableId.pollingStation.votingMunicipality.id
  ]);

  return (
    <Modal isOpen={openModalUpdateRespondent}>
      <ModalHeader className="bg-primary text-white">Actualizar Encuestado</ModalHeader>
      <ModalBody>
        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit(handleSubmitUpdateForm)}>
        <label htmlFor='name'>Nombre</label>
          <input
            type='text'
            className='form-control'
            id='name'
            placeholder='Nombre'
            defaultValue={respondent.name}
            {...register('name', { required: 'Necesita un nombre!' })}
          />
          <label htmlFor='phoneNumber'>Celular</label>
          <input
            type="text"
            className="form-control"
            placeholder="telefono"
            id="phoneNumber"
            defaultValue={respondent.phoneNumber}
            {...register('phoneNumber', { required: 'Necesita un número de celular!' })}
          />
          <label htmlFor='identityCard'>Cédula</label>
          <input
            type="text"
            className="form-control"
            placeholder="cedula"
            id="identityCard"
            defaultValue={respondent.identityCard}
            {...register('identityCard', { required: 'Necesita un número de cédula!' })}
          />
          <label htmlFor='municipality'>Municipio</label>
          <select
            className="form-control"
            id="municipality"
            {...register('municipality', { required: 'Necesita un municipio!' })}
            defaultValue={respondent.neighborhood.municipality.id}
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
            className="form-control"
            id="neighborhood"
            required={false}
            {...register('neighborhood', { required: 'Necesita un barrio!' })}
            value={selectedNeighborhoodId || respondent.neighborhood.id}
            onChange={(e) => setSelectedNeighborhoodId(parseInt(e.target.value))}
          >
            {neighborhoods.length && neighborhoods.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
          </select>
          <label htmlFor='address'>Dirección</label>
          <input
            type="text"
            className="form-control"
            placeholder="direccion"
            id="address"
            defaultValue={respondent.address}
            {...register('address', { required: 'Necesita una dirección!' })}
          />
          <label htmlFor='votingMunicipality'>Municipio de Votación</label>
          <select
            className="form-control"
            id="votingMunicipality"
            {...register('votingMunicipality', { required: 'Necesita un municipio de votación!' })}
            defaultValue={
              respondent.votingTableId.pollingStation.votingMunicipality.id
            }
            onChange={(e) =>
              setSelectedVotingMunicipalityId(parseInt(e.target.value))
            }
          >
            {
            votingMunicipalities.length &&
              votingMunicipalities.map((votingMunicipality, i) => (
                <option key={i} value={votingMunicipality.id}>
                  {votingMunicipality.name}
                </option>
              ))
            }
          </select>
          <label htmlFor='pollingStation'>Puesto de Votación</label>
          <select
            value={respondent.votingTableId.pollingStation.id}
            className="form-control"
            id="pollingStation"
            {...register('pollingStation', { required: 'Necesita un puesto de votación!' })}
            onChange={
              (e) => setSelectedPollingStationId(parseInt(e.target.value))
            }
          >
            {pollingStations.length && pollingStations.map((e, i) => {
              return (<option key={i} value={e.id}>{e.name}</option>)
            })}
          </select>
          <label htmlFor='votingTable'>Mesa de Votación</label>
          <select
            className="form-control"
            id='votingTable'
            required={false}
            {...register('votingTable', { required: 'Necesita una mesa de votación...' })}
            value={selectedVotingTableId || respondent.votingTableId.id}
            onChange={(e) => setSelectedVotingTableId(parseInt(e.target.value))}
          >
            {votingTables.length && votingTables.map((e, i) => {
              return (<option key={i} value={e.id}>{e.name}</option>)
            })}
          </select>
          <button className="btn btn-primary"type="submit">actualizar</button>
        </form>
      </ModalBody>
      <ModalFooter>
        <button
          className="btn btn-danger"
          onClick={handleCancelUpdate}
        >
          cancelar
        </button>
      </ModalFooter>
    </Modal>
  );
};
