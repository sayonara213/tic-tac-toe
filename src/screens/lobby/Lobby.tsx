import { useParams } from 'react-router-dom';
import { LobbyStyled as Styled } from './Lobby.styled';
import Game from '../../components/game/Game';
import GameHistory from './game-history/GameHistory';
import { IPlayer } from '../../types/user.types';
import { useState } from 'react';
import Score from './game-history/score/Score';
import Loader from '../../components/loader/Loader';

const Lobby: React.FC = () => {
  const { id } = useParams();

  const [players, setPlayers] = useState<IPlayer[]>([]);

  return (
    <Styled.Container>
      <Styled.GameContainer>
        <Score players={players} />
        <Game gameId={id!} setPlayers={setPlayers} />
      </Styled.GameContainer>
      <Styled.HistoryContainer>
        <GameHistory gameId={id!} players={players} />
      </Styled.HistoryContainer>
    </Styled.Container>
  );
};

export default Lobby;
