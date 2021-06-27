import { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';
import githubIconImg from '../../assets/images/github-icon.svg';
import facebookIconImg from '../../assets/images/facebook-icon.svg';
import loginIcon from '../../assets/images/login-icon.svg';
import Button from '../../components/Button';

import '../../styles/auth.scss';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { database } from '../../services/firebase';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function Home() {
  const history = useHistory();
  const [roomCode, setRoomCode] = useState('');
  const { signInWithgoogle, signInWithgithub, signInWithfacebook, user } = useAuth();

  async function handleCreateRoom(type: string) {
    if (!user) {
      if (type === "google") {
        await signInWithgoogle();
      } else if (type === "github") {
        await signInWithgithub();
      } else if (type === "facebook") {
        await signInWithfacebook();
      }
    }
  };

  useEffect(() => {
    if (user) {
      history.push("/rooms/new");
    }
  }, [user]);

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error('Room does not exists.');
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error('Room already closed.');
      return;
    }

    history.push(`/room/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button className="create-room" onClick={() => handleCreateRoom("google")}>
            <img src={googleIconImg} alt="Logo do google" />
            Crie sua sala com o Google
          </button>
          <button className="create-room github" onClick={() => handleCreateRoom("github")}>
            <img src={githubIconImg} alt="Logo do github" />
            Crie sua sala com o Github
          </button>
          <button className="create-room facebook" onClick={() => handleCreateRoom("facebook")}>
            <img src={facebookIconImg} alt="Logo do facebook" />
            Crie sua sala com o Facebook
          </button>
          <div className="separator">
            ou entre em uma sala
          </div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              <img src={loginIcon} alt="Logo do facebook" />
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;