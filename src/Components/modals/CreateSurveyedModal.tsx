import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useCustomDispatch, useCustomSelector } from '../../redux/hooks/useRedux';
import { setOpenModalCreateRespondent } from '../../redux/slices/surveyedSlice';

export const CreateSurveyedModal = () => {
  const dispatch = useCustomDispatch();
  const { openModalCreateRespondent } = useCustomSelector((state) => state.surveyed);

  return (
    <Modal
      isOpen={openModalCreateRespondent}
    >
      <ModalHeader>crear encuestado</ModalHeader>
      <ModalFooter>
        <button className='btn btn-primary'>actualizar</button>
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
