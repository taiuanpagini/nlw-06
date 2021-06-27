import Modal from 'react-modal';
import { useModal } from '../../hooks/useModal';
import Button from '../Button';
import closeImg from '../../assets/images/close.svg';

import './styles.scss';
import { database } from '../../services/firebase';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function ModalComponent() {
  const { modal, setModal } = useModal();

  function handleCloseModalRemoveQuestion() {
    setModal({ active: false });
  }

  async function handleDeleteQuestion() {
    setModal({ active: false });

    await database.ref(`rooms/${modal.roomId}/questions/${modal.questionId}`).remove();
  }

  return (
    <Modal
      overlayClassName='overlay'
      isOpen={modal.active}
      onRequestClose={handleCloseModalRemoveQuestion}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="modal-close">
        <img src={closeImg} alt="Encerrar sala" />
        <h2>{modal?.title}</h2>
        <p>{modal.description}</p>
        <div className="buttons">
          <Button onClick={handleCloseModalRemoveQuestion}>Cancelar</Button>
          <Button onClick={handleDeleteQuestion}>Sim, encerrar</Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalComponent;