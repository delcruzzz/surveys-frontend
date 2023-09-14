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

  useEffect(() => {
    dispatch(fetchMunicipalities());
    dispatch(fetchVotingTables(selectedPollingStationId))
    dispatch(fetchNeighborhoods(selectedMunicipalityId))
    dispatch(fetchPollingStations(selectedVotingMunicipality))
    dispatch(fetchVotingMunicipalities())
  }, [dispatch, selectedPollingStationId, selectedMunicipalityId, selectedVotingMunicipality]);


  return (
    <Modal isOpen={openModalUpdateRespondent}>
      <ModalHeader className="bg-primary text-white">Actualizar Encuestado</ModalHeader>
      <ModalBody>
        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit(handleSubmitUpdateForm)}>
        <div className="form-group">
        <label htmlFor='name'>Nombre</label>
          <input
            type='text'
            className='form-control'
            id='name'
            placeholder='Nombre'
            defaultValue={respondent?.name}
            {...register('name', { required: 'Necesita un nombre!' })}
          />
          </div>
          <label htmlFor='phoneNumber'>Celular</label>
          <input
            type="text"
            className="form-control"
            placeholder="telefono"
            id="phoneNumber"
            defaultValue={respondent?.phoneNumber}
            {...register('phoneNumber', { required: 'Necesita un número de celular!' })}
          />
          <label htmlFor='identityCard'>Cédula</label>
          <input
            type="text"
            className="form-control"
            placeholder="cedula"
            id="identityCard"
            defaultValue={respondent?.identityCard}
            {...register('identityCard', { required: 'Necesita un número de cédula!' })}
          />
          <label htmlFor='municipality'>Municipio</label>
          <select
            defaultValue={respondent?.neighborhood.municipality.id}
            className="form-control"
            id="municipality"
            {...register('municipality', { required: 'Necesita un municipio!' })}
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
            defaultValue={respondent.neighborhood.id || ""}
            className="form-control"
            id="neighborhood"
            {...register('neighborhood', { required: 'Necesita un barrio!' })}
            onChange={(e) => console.log(e.target.value)}
          >
            {neighborhoods.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
          </select>
          <label htmlFor='address'>Dirección</label>
          <input
            type="text"
            className="form-control"
            placeholder="direccion"
            id="address"
            defaultValue={respondent?.address}
            {...register('address', { required: 'Necesita una dirección!' })}
          />
          <label htmlFor='votingMunicipality'>Municipio de Votación</label>
          <select
            defaultValue={
              respondent?.votingTableId.pollingStation.votingMunicipality.id
            }
            className="form-control"
            id="votingMunicipality"
            {...register('votingMunicipality', { required: 'Necesita un municipio de votación!' })}
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
            value={selectedPollingStationId || respondent?.votingTableId.pollingStation.id}
            className="form-control"
            id="pollingStation"
            {...register('pollingStation', { required: 'Necesita un puesto de votación!' })}
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
          <button className="btn btn-primary"type="submit">actualizar</button>
        </form>
      </ModalBody>
      <ModalFooter>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(setOpenModalUpdateRespondent(false))}
        >
          cancelar
        </button>
      </ModalFooter>
    </Modal>
  );
};
