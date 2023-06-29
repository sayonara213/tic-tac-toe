import React, { useState } from 'react';
import { HomeStyled as Styled } from './Home.styled';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../components/global/App';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { crossOrCircle } from '../../services/random';
import { FieldEntity } from '../../models/game/field/FieldEntity';
import GameList from './game-list/GameList';
import { useAppSelector } from '../../hooks/hooks';
import CustomButton from '../../components/button/CustomButton';
import CustomInput from '../../components/global/custom-input/CustomInput';
import { notifyEndProgress, notifyError, notifyProgress } from '../../services/banners';

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
      isWin: false,
      date: new Date(),
    });
    navigate(ROUTES.game + game.id);
  };

  const joinGame = async () => {
    if (!gameId) {
      notifyError('Game ID is required');
      return;
    }

    const notification = notifyProgress('Joining game...');
    try {
      const game = await getDoc(doc(db, 'game', gameId));
      if (!game.exists()) {
        notifyEndProgress(notification, 'Game not found');
        return;
      }
      notifyEndProgress(notification, 'Game joined');
    } catch (error) {
      notifyEndProgress(notification, 'Error occurred');
      return;
    }
    navigate(ROUTES.game + gameId);
  };

  const startSingleplayer = () => {
    navigate(ROUTES.single);
  };

  return (
    <Styled.Container>
      <Styled.Interactions>
        <CustomButton onClick={startSingleplayer} width='100%'>
          Start singleplayer
        </CustomButton>
        <CustomButton onClick={createGame} width='100%'>
          Start online
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
