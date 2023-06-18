import { useState, useEffect } from 'react';
import Field from './field/Field';
import { FieldEntity } from '../../models/game/field/FieldEntity';
import { GameStyled as Styled } from './Game.styled';
import Confetti from 'react-confetti';

const Game: React.FC = () => {
  const [field, setField] = useState(new FieldEntity());
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    restart();
  }, []);

  useEffect(() => {
    checkWin();
  }, [field]);

  const checkWin = () => {
    if (field.cells.length > 0) {
      const win = field.checkWin();
      if (win) {
        setIsWin(true);
      }
    }
  };

  const restart = () => {
    setIsWin(false);
    const newField = new FieldEntity();
    newField.initField();
    setField(newField);
  };

  return (
    <Styled.Container>
      <Field field={field} setField={setField} />
      <Styled.Button onClick={restart}>RESTART</Styled.Button>
      {isWin && <Confetti width={document.body.clientWidth} />}
    </Styled.Container>
  );
};

export default Game;
