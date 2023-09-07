<<<<<<< HEAD
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  useCustomDispatch,
  useCustomSelector,
} from "../../redux/hooks/useRedux";
import { setOpenModalUpdateRespondent } from "../../redux/slices/surveyedSlice";
import { useEffect, useState } from "react";
import { fetchMunicipalities } from "../../redux/thunks/municipalitiesThunk";
import { fetchNeighborhoods } from "../../redux/thunks/neighborhoodsThunk";

export const UpdateSurveyedModal = () => {
  const dispatch = useCustomDispatch();
  const { openModalUpdateRespondent, respondent } = useCustomSelector(
    (state) => state.surveyed
  );
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState(
    respondent?.neighborhood.municipality.id
  );
  const { municipalities } = useCustomSelector((state) => state.municipalities);
  const { neighborhoods } = useCustomSelector((state) => state.neighborhoods);


  const idMunicipality =
    selectedMunicipalityId === undefined
      ? respondent?.neighborhood.municipality.id
      : selectedMunicipalityId;

  useEffect(() => {
    dispatch(fetchMunicipalities());
    dispatch(fetchNeighborhoods(idMunicipality));
  }, [dispatch, idMunicipality]);
=======
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
>>>>>>> bd6a8e250d11d7b9aa3cc45dc1c2373242641af8

  return (
    <Modal isOpen={openModalUpdateRespondent}>
      <ModalHeader>actualizar encuestado</ModalHeader>
      <ModalBody>
<<<<<<< HEAD
        <form className="d-flex flex-column gap-3">
          <input
            type="text"
            className="form-control"
            placeholder="nombre"
            defaultValue={respondent?.name}
=======
        <form className='d-flex flex-column gap-3'>
          <label htmlFor='name'>nombre</label>
          <input
            type='text'
            className='form-control'
            placeholder='nombre'
            defaultValue={respondent.name}
>>>>>>> bd6a8e250d11d7b9aa3cc45dc1c2373242641af8
          />
          <label htmlFor='cellPhoneNumber'>celular</label>
          <input
<<<<<<< HEAD
            type="text"
            className="form-control"
            placeholder="telefono"
            defaultValue={respondent?.phoneNumber}
=======
            type='text'
            className='form-control'
            placeholder='telefono'
            defaultValue={respondent.phoneNumber}
>>>>>>> bd6a8e250d11d7b9aa3cc45dc1c2373242641af8
          />
          <label htmlFor='identityCard'>cédula</label>
          <input
<<<<<<< HEAD
            type="text"
            className="form-control"
            placeholder="cedula"
            defaultValue={respondent?.identityCard}
=======
            type='text'
            className='form-control'
            placeholder='cédula'
            defaultValue={respondent.identityCard}
>>>>>>> bd6a8e250d11d7b9aa3cc45dc1c2373242641af8
          />
          <label htmlFor='municipality'>municipio</label>
          <select
<<<<<<< HEAD
            defaultValue={respondent?.neighborhood.municipality.id}
            className="form-control"
            onChange={(e) =>
              setSelectedMunicipalityId(parseInt(e.target.value))
            }
          >
            {municipalities &&
              municipalities.map((municipality) => (
                <option key={municipality.id} value={municipality.id}>
                  {municipality.name}
                </option>
              ))}
          </select>
            <select
              defaultValue={respondent?.neighborhood.id || ""}
              className="form-control"
              onChange={(e) => console.log(e.target.value)}
            >
              {municipalities && selectedMunicipalityId ? (
              municipalities.find(
                  (municipality) => municipality.id === selectedMunicipalityId
                )
                ?.neighborhoods.map((neighborhood) => (
                  <option key={neighborhood.id} value={neighborhood.id}>
                    {neighborhood.name}
                  </option>
                ))): (<option value={respondent?.neighborhood.id}>Seleccione un barrio</option>)
              }
            </select>
            {/*{neighborhoods.length &&
              neighborhoods.map((neighborhood) => {
                return (
                  <option key={neighborhood.id} value={neighborhood.id}>
                    {neighborhood.name}
                  </option>
                );
              })}
            </select>*/}
          <input
            type="text"
            className="form-control"
            placeholder="direccion"
            defaultValue={respondent?.address}
=======
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
>>>>>>> bd6a8e250d11d7b9aa3cc45dc1c2373242641af8
          />
          <label htmlFor='votingMunicipality'>municipio de votación</label>
          <select
<<<<<<< HEAD
            defaultValue={
              respondent?.votingTable.pollingStation.votingMunicipality.name
            }
            className="form-control"
=======
            defaultValue={respondent.votingTable.pollingStation.votingMunicipality.id}
            className='form-control'
>>>>>>> bd6a8e250d11d7b9aa3cc45dc1c2373242641af8
          >
            <option></option>
          </select>
          <label htmlFor='pollingStation'>puesto de votación</label>
          <select
<<<<<<< HEAD
            defaultValue={respondent?.votingTable.pollingStation.name}
            className="form-control"
=======
            defaultValue={respondent.votingTable.pollingStation.id}
            className='form-control'
>>>>>>> bd6a8e250d11d7b9aa3cc45dc1c2373242641af8
          >
            <option></option>
          </select>
          <label htmlFor='votingTable'>mesa de votación</label>
          <select
<<<<<<< HEAD
            defaultValue={respondent?.votingTable.name}
            className="form-control"
=======
            defaultValue={respondent.votingTable.id}
            className='form-control'
>>>>>>> bd6a8e250d11d7b9aa3cc45dc1c2373242641af8
          >
            <option></option>
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
