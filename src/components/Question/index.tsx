import React, { FormEvent, ReactNode } from 'react';
import cx from 'classnames';

import './styles.scss';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import Button from '../../components/Button';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
  isReply: boolean;
  reply: string;
  roomId?: string;
  questionId?: string;
};

function Question({
  content,
  author,
  isHighlighted = false,
  isAnswered = false,
  isReply,
  reply,
  roomId,
  questionId,
  children
}: QuestionProps) {
  const [newReply, setNewReply] = useState('');
  const { user } = useAuth();

  async function handleSendReply(event: FormEvent) {
    event.preventDefault();

    if (newReply.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in');
    }

    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      reply: newReply,
      isAnswered: true
    });

    setNewReply('');
  }

  return (
    <div
      className={cx(
        'question',
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>

      {
        isReply && isHighlighted && !reply && (
          <form onSubmit={handleSendReply}>
            <textarea
              placeholder="Qual a resposta para a pergunta?"
              onChange={event => setNewReply(event.target.value)}
              value={newReply}
            />
            <Button type="submit" disabled={!user}>Enviar resposta</Button>
          </form>
        )
      }

      {
        reply && (
          <p className="reply-question">{`Resposta: ${reply}`}</p>
        )
      }
    </div>
  );
}

export default Question;