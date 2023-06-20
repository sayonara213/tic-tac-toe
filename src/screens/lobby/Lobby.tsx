import { useNavigate, useParams } from 'react-router-dom';
import { LobbyStyled as Styled } from './Lobby.styled';
import Game from '../../components/game/Game';
import { ROUTES } from '../../constants/routes';
import CustomButton from '../../components/button/CustomButton';
import Loader from '../../components/loader/Loader';

const Lobby: React.FC = () => {
  const { id } = useParams();
  return (
    <Styled.Container>
      <Game gameId={id!} />
    </Styled.Container>
  );
};

export default Lobby;
