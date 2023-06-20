import Field from './field/Field';
import { GameStyled as Styled } from './Game.styled';
import Confetti from 'react-confetti';
import { GameProps } from './Game.types';
import { useGameState } from './Game.state';
import CustomButton from '../button/CustomButton';
import Loader from '../loader/Loader';

const Game: React.FC<GameProps> = ({ gameId }) => {
  const { field, setField, game, restart, isWin, fieldLoading } = useGameState(gameId);

  if (fieldLoading) {
    return <Loader />;
  }

  return (
    <Styled.Container>
      {isWin && <Styled.Span>YOU WON</Styled.Span>}
      <Field field={field} setField={setField} game={game} gameId={gameId} />
      <CustomButton width='500px' onClick={restart}>
        RESTART
      </CustomButton>
      {isWin && <Confetti width={document.body.clientWidth} />}
    </Styled.Container>
  );
};

export default Game;
