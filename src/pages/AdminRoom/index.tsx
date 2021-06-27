
import { useHistory, useParams } from 'react-router-dom';
import logoIcon from '../../assets/images/logo.svg';
import questionIllustration from '../../assets/images/illustration-question.svg';
import Button from '../../components/Button';
import RoomCode from '../../components/RoomCode';
import Question from '../../components/Question';
import { useRoom } from '../../hooks/useRoom';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';

import '../../styles/room.scss';
import { database } from '../../services/firebase';
import { useModal } from '../../hooks/useModal';

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
    setModal({
      active: true,
      title: 'Encerrar Sala',
      description: 'Tem certeza que deseja encerrar a sala?',
      questionId: questionId,
      roomId: roomId
    });
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    });

    history.push('/');
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    });
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
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
              isReply={true}
              roomId={roomId}
              questionId={question.id}
              reply={question.reply}
            >
              {
                !question.isAnswered && (
                  <>
                    <button
                      className={`like-button ${question.likeId && 'liked'}`}
                      type="button"
                      aria-label="Marcar como gostei"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      className={`like-button ${question.likeId && 'liked'}`}
                      type="button"
                      aria-label="Marcar como gostei"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque a pergunta" />
                    </button>
                  </>
                )
              }
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