import React from 'react';
import { HomeStyled as Styled } from './Home.styled';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../components/global/App';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { crossOrCircle } from '../../services/random';
import { FieldEntity } from '../../models/game/field/FieldEntity';
import GameList from './game-list/GameList';
import { useAppSelector } from '../../hooks/hooks';
import CustomButton from '../../components/button/CustomButton';

const Home: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const createGame = async () => {
    const field = new FieldEntity();
    field.initField();
    const move = crossOrCircle();
    const secondMove = move === 'cross' ? 'circle' : 'cross';
    const game = await addDoc(collection(db, 'game'), {
      players: [
        { uid: user.uid, move, winCount: 0 },
        { uid: '', move: secondMove, winCount: 0 },
      ],
      field: JSON.stringify(field.cells),
      nextMove: 'circle',
      date: new Date(),
    });
    navigate(ROUTES.game + game.id);
  };

  return (
    <Styled.Container>
      <CustomButton onClick={createGame} width='30%'>
        Start game
      </CustomButton>
      <GameList />
    </Styled.Container>
  );
};

export default Home;
