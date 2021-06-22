import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import githubIconImg from '../assets/images/github-icon.svg';
import facebookIconImg from '../assets/images/facebook-icon.svg';
import Button from '../components/Button';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';

function Home() {
  const history = useHistory();
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

    history.push("/rooms/new");
  };

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
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;