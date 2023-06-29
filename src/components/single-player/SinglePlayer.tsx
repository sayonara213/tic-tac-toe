import React, { useEffect, useState } from 'react';
import { ISinglePlayerProps } from './SinglePlayer.types';
import { FieldEntity, TMove } from '../../models/game/field/FieldEntity';

import { SinglePlayerStyled as Styled } from './SinglePlayer.styled';
import Field from '../game/field/Field';
import CustomButton from '../button/CustomButton';
import Confetti from 'react-confetti';

const SinglePlayer: React.FC<ISinglePlayerProps> = () => {
  const [field, setField] = useState<FieldEntity>(new FieldEntity());
  const [isWin, setIsWin] = useState<boolean>(false);

  useEffect(() => {
    restart();
  }, []);

  useEffect(() => {
    checkWin();
  }, [field]);

  const restart = () => {
    setIsWin(false);
    const newField = new FieldEntity();
    newField.initField();
    setField(newField);
  };

  const checkWin = () => {
    const win = field.checkWin();
    if (win) {
      setIsWin(true);
    }
  };

  return (
    <Styled.Container>
      <Styled.GameWrapper>
        <Field field={field} setField={setField} canMove={true} isMultiplayer={false} />
        <CustomButton width='100%' onClick={restart}>
          RESTART
        </CustomButton>
      </Styled.GameWrapper>
      {isWin && <Confetti width={document.body.clientWidth} />}
    </Styled.Container>
  );
};

export default SinglePlayer;
