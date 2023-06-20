import React from 'react';
import { HomeStyled as Styled } from './Home.styled';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../components/global/App';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { crossOrCircle } from '../../services/random';
import { getUid } from '../../services/auth';
import { FieldEntity } from '../../models/game/field/FieldEntity';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const uid = getUid();

  const createGame = async () => {
    const field = new FieldEntity();
    field.initField();
    const move = crossOrCircle();
    const secondMove = move === 'cross' ? 'circle' : 'cross';
    const game = await addDoc(collection(db, 'game'), {
      players: [
        { name: uid, move },
        { name: '', move: secondMove },
      ],
      field: JSON.stringify(field.cells),
      nextMove: 'circle',
    });
    navigate(ROUTES.game + game.id);
  };

  return (
    <Styled.Container>
      <button onClick={createGame}>Start game</button>
    </Styled.Container>
  );
};

export default Home;
