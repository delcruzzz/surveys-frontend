import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useCustomDispatch, useCustomSelector } from '../../redux/hooks/useRedux';
import { setOpenModalCreateRespondent } from '../../redux/slices/surveyedSlice';
import { useForm } from 'react-hook-form';
import { createSurveyed } from '../../redux/thunks/surveyedThunk';
import { CreateSurveyed } from '../../redux/interfaces/surveyedInterface';

export const CreateSurveyedModal = () => {
  const dispatch = useCustomDispatch();
  const { openModalCreateRespondent } = useCustomSelector((state) => state.surveyed);
  const { user } = useCustomSelector((state) => state.auth)
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

  return (
    <Modal
      isOpen={openModalCreateRespondent}
    >
      <ModalHeader>crear encuestado</ModalHeader>
      <ModalBody>
        <form className='d-flex flex-column gap-3' onSubmit={handleSubmit(handleSubmitCreateRespondent)}>
          <label htmlFor='name'>nombre</label>
          <input
            type='text'
            className='form-control'
            id='name'
            placeholder='nombre'
            {...register('name', { required: 'name is required!' })}
          />
          {errors.name && (
            <p className='text-danger' style={{ fontSize: 14 }}>
              {errors.name.message}
            </p>
          )}
          <label htmlFor='phoneNumber'>celular</label>
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
          <label htmlFor='identityCard'>cédula</label>
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
          <label htmlFor='municipality'>municipio</label>
          <select className='form-select' aria-label='Default select example'>
            <option>seleccione un municipio</option>
          </select>
          <label htmlFor='neighborhood'>barrio</label>
          <select className='form-select' aria-label='Default select example'>
            <option></option>
          </select>
          <label htmlFor='address'>dirección</label>
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
          <label htmlFor='votingMunicipality'>municipio de votación</label>
          <select
            className='form-control'
          >
            <option></option>
          </select>
          <label htmlFor='pollingStation'>puesto de votación</label>
          <select
            className='form-control'
          >
            <option></option>
          </select>
          <label htmlFor='votingTable'>mesa de votación</label>
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
