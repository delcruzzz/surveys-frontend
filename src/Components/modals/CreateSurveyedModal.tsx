import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useEffect, useState } from "react";
import { useCustomDispatch, useCustomSelector } from '../../redux/hooks/useRedux';
import { setOpenModalCreateRespondent } from '../../redux/slices/surveyedSlice';
import { useForm } from 'react-hook-form';
import { createSurveyed } from '../../redux/thunks/surveyedThunk';
import { fetchMunicipalities } from "../../redux/thunks/municipalitiesThunk";
import { CreateSurveyed } from '../../redux/interfaces/surveyedInterface';

export const CreateSurveyedModal = () => {
  const dispatch = useCustomDispatch();
  const { municipalities } = useCustomSelector((state) => state.municipalities);
  const { openModalUpdateRespondent, respondent } = useCustomSelector(
    (state) => state.surveyed
  );
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState(
    respondent?.neighborhood.municipality.id
  );
  const { openModalCreateRespondent } = useCustomSelector((state) => state.surveyed);
  useCustomSelector((state) => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitCreateRespondent = async (data: any) => {
    data = {
      ...data,
      phoneNumber: data.phoneNumber,
      neighborhoodId: 4
    }
    await dispatch(createSurveyed(data))
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
          <select className='form-select' aria-label='Default select example'>
            <option></option>
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
            className='form-control'
          >
            <option></option>
          </select>
          <label htmlFor='pollingStation'>Puesto de Votación</label>
          <select
            className='form-control'
          >
            <option></option>
          </select>
          <label htmlFor='votingTable'>Mesa de Votación</label>
          <select
            className='form-control'
          >
            <option></option>
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
