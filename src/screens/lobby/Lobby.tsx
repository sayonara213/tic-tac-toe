import { useParams } from 'react-router-dom';
import { LobbyStyled as Styled } from './Lobby.styled';
import Game from '../../components/game/Game';
import GameHistory from './game-history/GameHistory';
import { IPlayer, IUser } from '../../types/user.types';
import { useState } from 'react';

const Lobby: React.FC = () => {
  const { id } = useParams();

  const [players, setPlayers] = useState<IPlayer[]>([]);

  return (
    <Styled.Container>
      <Game gameId={id!} setPlayers={setPlayers} />
      <Styled.HistoryContainer>
        <GameHistory gameId={id!} players={players} />
      </Styled.HistoryContainer>
    </Styled.Container>
  );
};

export default Lobby;
