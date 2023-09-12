import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useEffect, useState } from "react";
import { useCustomDispatch, useCustomSelector } from '../../redux/hooks/useRedux';
import { setOpenModalCreateRespondent } from '../../redux/slices/surveyedSlice';
import { useForm } from 'react-hook-form';
import { createSurveyed } from '../../redux/thunks/surveyedThunk';
import { fetchMunicipalities } from "../../redux/thunks/municipalitiesThunk";

export const CreateSurveyedModal = () => {
  const dispatch = useCustomDispatch();
  const { municipalities } = useCustomSelector((state) => state.municipalities);
  const { votingMunicipalities } = useCustomSelector(
    (state) => state.votingMunicipalities
  );
  const { openModalUpdateRespondent, respondent } = useCustomSelector(
    (state) => state.surveyed
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

  const handleSubmitCreateRespondent = async (data: any, e: any) => {
    e.preventDefault();
    data = {
      ...data,
      phoneNumber: data.phoneNumber,
      neighborhoodId: data.neighborhood,
    }
    dispatch(createSurveyed(data))
    dispatch(setOpenModalCreateRespondent(false))
    window.location.replace('');
  }

  useEffect(() => {
    dispatch(fetchMunicipalities());
  }, [dispatch]);

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
              <option value={""}>
                Seleccione un barrio
              </option>
            )}
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
            onChange={(e) =>
              setSelectedVotingMunicipalityId(parseInt(e.target.value))
            }
          >
            {votingMunicipalities &&
            respondent?.votingTableId.pollingStation.votingMunicipality.id !==
              undefined ? (
              votingMunicipalities
                .find(
                  (x) =>
                    x.id ===
                    Number(
                      respondent?.votingTableId.pollingStation.votingMunicipality
                        .id
                    )
                )
                ?.pollingStations.map((pollingStation) => (
                  <option key={pollingStation.id} value={pollingStation.id}>
                    {pollingStation.name}
                  </option>
                ))
            ) : (
              <option value={""}>
                Seleccione un puesto de votación
              </option>
            )}
          </select>
          <label htmlFor='votingTable'>Mesa de Votación</label>
          <input
            type="text"
            className="form-control"
            placeholder="mesa de votacion"
            defaultValue={1}
            {...register('votingTable', { required: 'Necesita una mesa de votación...' })}
          />
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
