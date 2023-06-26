import React, { useState } from 'react';
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
import CustomInput from '../../components/global/custom-input/CustomInput';

const Home: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const [gameId, setGameId] = useState<string>('');

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

  const joinGame = () => {
    if (!gameId) return;
    navigate(ROUTES.game + gameId);
  };

  return (
    <Styled.Container>
      <Styled.Interactions>
        <CustomButton onClick={createGame} width='100%'>
          Start game
        </CustomButton>
        <Styled.JoinGameWrap>
          <CustomInput value={gameId} onChange={setGameId} placeholder='Game ID...' />
          <CustomButton onClick={joinGame}>JOIN</CustomButton>
        </Styled.JoinGameWrap>
      </Styled.Interactions>
      <GameList />
    </Styled.Container>
  );
};

export default Home;
