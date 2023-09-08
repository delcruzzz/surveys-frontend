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

export const UpdateSurveyedModal = () => {
  const dispatch = useCustomDispatch();
  const { openModalUpdateRespondent, respondent } = useCustomSelector(
    (state) => state.surveyed
  );
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState(
    respondent?.neighborhood.municipality.id
  );
  const [selectedVotingMunicipality, setSelectedVotingMunicipalityId] =
    useState(respondent?.votingTable.pollingStation.votingMunicipality.id);
  const [selectedVotingTables, setSelectedVotingTablesId] = useState(
    respondent?.votingTable.id
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
      ? respondent?.votingTable.pollingStation.votingMunicipality.id
      : selectedVotingMunicipality;

  const idVotingTables =
    selectedVotingTables === undefined
      ? respondent?.votingTable.pollingStation.id
      : selectedVotingTables;

  useEffect(() => {
    dispatch(fetchMunicipalities());
    dispatch(fetchVotingMunicipalityies());
    dispatch(fetchNeighborhoods(idMunicipality));
    dispatch(fetchPollingStations(idVotingMunicipality));
    dispatch(fetchVotingTables(respondent?.votingTable.pollingStation.id));
  }, [dispatch, idMunicipality, idVotingMunicipality, idVotingTables]);

  console.log({"pollingId": respondent?.votingTable.pollingStation.id})

  console.log({idVotingTables})

  return (
    <Modal isOpen={openModalUpdateRespondent}>
      <ModalHeader>Actualizar Encuestado</ModalHeader>
      <ModalBody>
        <form className="d-flex flex-column gap-3">
        <label htmlFor='name'>Nombre</label>
          <input
            type='text'
            className='form-control'
            id='name'
            placeholder='Nombre'
            defaultValue={respondent?.name}
          />
          <label htmlFor='phoneNumber'>Celular</label>
          <input
            type="text"
            className="form-control"
            placeholder="telefono"
            defaultValue={respondent?.phoneNumber}
          />
          <label htmlFor='identityCard'>Cédula</label>
          <input
            type="text"
            className="form-control"
            placeholder="cedula"
            defaultValue={respondent?.identityCard}
          />
          <label htmlFor='municipality'>Municipio</label>
          <select
            defaultValue={respondent?.neighborhood.municipality.id}
            className="form-control"
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
            onChange={(e) => console.log(e.target.value)}
          >
            {municipalities &&
            respondent?.neighborhood.municipality.id !== undefined ? (
              municipalities
                .find(
                  (x) =>
                    x.id === Number(respondent?.neighborhood.municipality.id)
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
            defaultValue={respondent?.address}
          />
          <label htmlFor='votingMunicipality'>Municipio de Votación</label>
          <select
            defaultValue={
              respondent?.votingTable.pollingStation.votingMunicipality.id
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
            defaultValue={respondent?.votingTable.pollingStation.id || ""}
            className="form-control"
            onChange={(e) =>
              setSelectedVotingMunicipalityId(parseInt(e.target.value))
            }
          >
            {votingMunicipalities &&
            respondent?.votingTable.pollingStation.votingMunicipality.id !==
              undefined ? (
              votingMunicipalities
                .find(
                  (x) =>
                    x.id ===
                    Number(
                      respondent?.votingTable.pollingStation.votingMunicipality
                        .id
                    )
                )
                ?.pollingStations.map((pollingStation) => (
                  <option key={pollingStation.id} value={pollingStation.id}>
                    {pollingStation.name}
                  </option>
                ))
            ) : (
              <option value={respondent?.votingTable.pollingStation.id || ""}>
                Seleccione un puesto de votación
              </option>
            )}
            {console.log(votingMunicipalities)}
          </select>
          <label htmlFor='votingTable'>Mesa de Votación</label>
          <select
            defaultValue={respondent?.votingTable.id}
            className="form-control"
            onChange={(e) =>
              setSelectedVotingTablesId(parseInt(e.target.value))
            }
          >
            {
            respondent?.votingTable.pollingStation.id !== undefined ? (
              pollingStations
                .find((x) => x.id === respondent?.votingTable.pollingStation.id)
                ?.votingTables.map((votingTables) => (
                  <option key={votingTables.id} value={votingTables.id}>
                    {votingTables.name}
                  </option>
                ))
            ) : (
              <option value={respondent?.votingTable.id || ""}>
                Seleccione una mesa
              </option>
            )}
            {console.log({idVotingTables})}
            {console.log(pollingStations)}
            {console.log(respondent?.votingTable.pollingStation.id)}
            {console.log(respondent?.votingTable.id)}
          </select>
        </form>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary">actualizar</button>
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
