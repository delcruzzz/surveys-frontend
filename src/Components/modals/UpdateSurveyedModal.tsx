import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  useCustomDispatch,
  useCustomSelector,
} from "../../redux/hooks/useRedux";
import { setOpenModalUpdateRespondent } from "../../redux/slices/surveyedSlice";
import { useEffect, useState } from "react";
import { fetchMunicipalities } from "../../redux/thunks/municipalitiesThunk";
import { fetchNeighborhoods } from "../../redux/thunks/neighborhoodsThunk";
import { fetchVotingMunicipalityies } from "../../redux/thunks/votingMunicipalityThunk";
import { fetchPollingStations } from "../../redux/thunks/pollingStationsThunk";
import { fetchVotingTables } from "../../redux/thunks/votingTablesThunk";
import { useForm } from 'react-hook-form';
import { updateSurveyed } from "../../redux/thunks/surveyedThunk";
import { fetchSurveyedById } from '../../redux/thunks/surveyedThunk';

export const UpdateSurveyedModal = () => {
  const dispatch = useCustomDispatch();
  const { openModalUpdateRespondent, respondent } = useCustomSelector(
    (state) => state.surveyed
  );
  //agrega id de municipio
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState(
    respondent?.neighborhood.municipality.id
  );
  //agrega id de barrios
  const [selectedNeighborhoodId, setSelectedNeighborhoodId] = useState(respondent.neighborhood.id);
  //agrega id de municipio de votación
  const [selectedVotingMunicipality, setSelectedVotingMunicipalityId] =
    useState(respondent?.votingTableId.pollingStation.votingMunicipality.id);
    //agrega id de mesa de votacion
  const [selectedVotingTables, setSelectedVotingTablesId] = useState(
    respondent?.votingTableId.id
  );

  const [selectedPollingStationId, setSelectedPollingStationId] = useState(
    respondent?.votingTableId.pollingStation.id
  );
  const { municipalities } = useCustomSelector((state) => state.municipalities);
  const { votingMunicipalities } = useCustomSelector(
    (state) => state.votingMunicipalities
  );
  const { pollingStations } = useCustomSelector(
    (state) => state.pollingStation
  );
  const { votingTables } = useCustomSelector((state) => state.votingTable);

  const idMunicipality =
    selectedMunicipalityId === undefined
      ? respondent?.neighborhood.municipality.id
      : selectedMunicipalityId;

  const idVotingMunicipality =
    selectedVotingMunicipality === undefined
      ? respondent?.votingTableId.pollingStation.votingMunicipality.id
      : selectedVotingMunicipality;

  const idVotingTables =
    selectedVotingTables === undefined
      ? respondent?.votingTableId.pollingStation.id
      : selectedVotingTables;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitUpdateForm = async (data: any, e: any) => {
    e.preventDefault();
    data = {
      ...data,
      phoneNumber: data.phoneNumber,
      neighborhoodId:selectedNeighborhoodId,
      pollingStation:selectedPollingStationId,
    }
    await dispatch(updateSurveyed(data, respondent.id))
    dispatch(setOpenModalUpdateRespondent(false))
    window.location.replace('');
  }

  useEffect(() => {
    dispatch(fetchMunicipalities());
    dispatch(fetchVotingMunicipalityies());
    dispatch(fetchNeighborhoods(idMunicipality));
    dispatch(fetchPollingStations(idVotingMunicipality));
    dispatch(fetchVotingTables(respondent?.votingTableId.pollingStation.id));
  }, [dispatch, idMunicipality, idVotingMunicipality, idVotingTables, respondent?.votingTableId.pollingStation.id]);

  return (
    <Modal isOpen={openModalUpdateRespondent}>
      <ModalHeader>Actualizar Encuestado</ModalHeader>
      <ModalBody>
        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit(handleSubmitUpdateForm)}>
        <label htmlFor='name'>Nombre</label>
          <input
            type='text'
            className='form-control'
            id='name'
            placeholder='Nombre'
            defaultValue={respondent?.name}
            {...register('name', { required: 'Necesita un nombre!' })}
          />
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
            defaultValue={respondent?.neighborhood.id || ""}
            className="form-control"
            id="neighborhood"
            {...register('neighborhood', { required: 'Necesita un barrio!' })}
            onChange={(e) =>
              setSelectedNeighborhoodId(parseInt(e.target.value))
            }
          >
            {municipalities &&
            respondent?.neighborhood.municipality.id !== undefined ? (
              municipalities
                .find(
                  (x) =>
                    x.id === selectedMunicipalityId
                )
                ?.neighborhoods.map((neighborhood) => (
                  <option key={neighborhood.id} value={neighborhood.id}>
                    {neighborhood.name}
                  </option>
                ))
            ) : (
              <option value={respondent?.neighborhood.id || ""}>
                Seleccione un barrio
              </option>
            )}
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
            {
              votingMunicipalities
                .find(
                  (x) =>
                    x.id === selectedVotingMunicipality
                )
                ?.pollingStations.map((pollingStation) => (
                  <option key={pollingStation.id} value={pollingStation.id}>
                    {pollingStation.name}
                  </option>
                ))
            }
          </select>
          <label htmlFor='votingTable'>Mesa de Votación</label>
          <input
            type="text"
            className="form-control"
            placeholder="mesa de votacion"
            id="votingTable"
            defaultValue={respondent?.votingTableId.id}
            {...register('votingTable', { required: 'Necesita una mesa de votación!' })}
          />
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
