import Field from './field/Field';
import { GameStyled as Styled } from './Game.styled';
import Confetti from 'react-confetti';
import { GameProps } from './Game.types';
import { useGameState } from './Game.state';
import CustomButton from '../button/CustomButton';
import Loader from '../loader/Loader';

const Game: React.FC<GameProps> = ({ gameId, setPlayers }) => {
  const { field, setField, playerMove, handleRestart, isWin, fieldLoading, isFull } = useGameState(
    gameId,
    setPlayers,
  );

  if (fieldLoading) {
    return <Loader />;
  }

  return (
    <Styled.Container>
      <Field
        field={field}
        setField={setField}
        playerMove={playerMove}
        gameId={gameId}
        canMove={isFull}
      />
      <CustomButton width='100%' onClick={handleRestart}>
        RESTART
      </CustomButton>
      {isWin && <Confetti width={document.body.clientWidth} />}
    </Styled.Container>
  );
};

export default Game;
