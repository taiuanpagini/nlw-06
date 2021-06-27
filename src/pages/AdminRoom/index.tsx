
import { useHistory, useParams } from 'react-router-dom';
import logoIcon from '../../assets/images/logo.svg';
import questionIllustration from '../../assets/images/illustration-question.svg';
import Button from '../../components/Button';
import RoomCode from '../../components/RoomCode';
import { useModal } from '../../hooks/useModal';
import Question from '../../components/Question';
import { useRoom } from '../../hooks/useRoom';
import deleteImg from '../../assets/images/delete.svg';

import '../../styles/room.scss';
import { database } from '../../services/firebase';

type RoomParams = {
  id: string;
};

function AdminRoom() {
  const { setModal } = useModal();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { questions, title } = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    //if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
    //  await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    //}
    setModal(true);
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    });

    history.push('/');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoIcon} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {
            questions.length === 0 && (
              <div className="no-question">
                <img src={questionIllustration} alt="Nenhuma pergunta na sala" />
                <h2>Nenhuma pergunta por aqui</h2>
                <p>Faça seu login e seja a primeira pessoa a fazer uma pergunta!</p>
              </div>
            )
          }
          {questions.map(question => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
            >
              <button
                className={`like-button ${question.likeId && 'liked'}`}
                type="button"
                aria-label="Marcar como gostei"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AdminRoom;