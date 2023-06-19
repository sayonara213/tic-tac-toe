import Field from './field/Field';
import { GameStyled as Styled } from './Game.styled';
import Confetti from 'react-confetti';
import { GameProps } from './Game.types';
import { useGameState } from './Game.state';

const Game: React.FC<GameProps> = ({ gameId }) => {
  const { field, setField, game, restart, isWin } = useGameState(gameId);

  return (
    <Styled.Container>
      <Field field={field} setField={setField} game={game} gameId={gameId} />
      <Styled.Button onClick={restart}>RESTART</Styled.Button>
      {isWin && <Confetti width={document.body.clientWidth} />}
    </Styled.Container>
  );
};

export default Game;
