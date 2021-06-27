import { findAllByTestId } from '@testing-library/dom';
import Modal from 'react-modal';
import { useModal } from '../../hooks/useModal';

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

  function teste() {
    setModal(false);
  }
  return (
    <Modal
      isOpen={true}
      onRequestClose={teste}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h2>Hello</h2>
      <button onClick={() => setModal(false)}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </Modal>
  );
}

export default ModalComponent;