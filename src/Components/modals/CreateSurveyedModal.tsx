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
      neighborhoodId: 4
    }
    dispatch(createSurveyed(data))
    dispatch(setOpenModalCreateRespondent(false))
    window.location.replace('');
    console.log(data)
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
            {...register('name', { required: 'name is required!' })}
            defaultValue={''}
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
            {...register('phoneNumber', { required: 'phoneNumber is required!' })}
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
            {...register('identityCard', { required: 'identityCard is required!' })}
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
            type='text'
            className='form-control'
            placeholder='dirección'
            id='address'
            {...register('address', { required: 'address is required!' })}
          />
          {errors.address && (
            <p className='text-danger' style={{ fontSize: 14 }}>
              {errors.address.message}
            </p>
          )}
          <label htmlFor='votingMunicipality'>Municipio de Votación</label>
          <select
            defaultValue={
              respondent?.votingTableId.pollingStation.votingMunicipality.id
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
            defaultValue={respondent?.votingTableId.pollingStation.id || ""}
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
              <option value={respondent?.votingTableId.pollingStation.id || ""}>
                Seleccione un puesto de votación
              </option>
            )}
            {console.log(votingMunicipalities)}
          </select>
          <label htmlFor='votingTable'>Mesa de Votación</label>
          <input
            type="text"
            className="form-control"
            placeholder="mesa de votacion"
            defaultValue={1}
            {...register('votingTable', { required: 'votingTable is required!' })}
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
