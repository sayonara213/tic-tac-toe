import { useNavigate, useParams } from 'react-router-dom';
import { LobbyStyled as Styled } from './Lobby.styled';
import Game from '../../components/game/Game';
import { ROUTES } from '../../constants/routes';
import CustomButton from '../../components/button/CustomButton';

const Lobby: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const back = () => {
    navigate(ROUTES.home);
  };
  return (
    <Styled.Container>
      {/* <button onClick={back}>Back</button> */}
      <Game gameId={id!} />
    </Styled.Container>
  );
};

export default Lobby;
