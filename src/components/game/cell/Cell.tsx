import React, { useState } from 'react';

import { CellStyled as Styled } from './Cell.styled';
import { CellType } from '../../../models/game/cell/CellEntity';
import { IMAGES } from '../../../constants/images';
import { TMove } from '../../../models/game/field/FieldEntity';

interface CellProps {
  id: number;
  type: CellType;
  onClick: (id: number, type: CellType) => void;
  move: TMove;
}

const Cell: React.FC<CellProps> = ({ id, type, onClick, move }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!isClicked) {
      onClick(id, 'circle');
      setIsClicked(true);

      setTimeout(() => {
        setIsClicked(false);
      }, 200);
    }
  };

  return (
    <Styled.Container type={type} onClick={handleClick} isClicked={isClicked} move={move}>
      {type !== 'empty' && <Styled.Icon src={IMAGES[type]} />}
    </Styled.Container>
  );
};

export default Cell;
