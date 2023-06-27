import Field from './field/Field';
import { GameStyled as Styled } from './Game.styled';
import Confetti from 'react-confetti';
import { GameProps } from './Game.types';
import { useGameState } from './Game.state';
import CustomButton from '../button/CustomButton';
import Loader from '../loader/Loader';

const Game: React.FC<GameProps> = ({ gameId, setPlayers }) => {
  const { field, setField, game, handleRestart, isWin, fieldLoading } = useGameState(
    gameId,
    setPlayers,
  );

  if (fieldLoading) {
    return <Loader />;
  }

  return (
    <Styled.Container>
      {isWin && <Styled.Span>YOU WON</Styled.Span>}
      <Field field={field} setField={setField} game={game} gameId={gameId} />
      <CustomButton width='100%' onClick={handleRestart}>
        RESTART
      </CustomButton>
      {isWin && <Confetti width={document.body.clientWidth} />}
    </Styled.Container>
  );
};

export default Game;
