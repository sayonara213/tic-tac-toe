import React, { useState } from 'react';

import { CellStyled as Styled } from './Cell.styled';
import { IMAGES } from '../../../constants/images';
import { CellProps } from './Cell.types';

const Cell: React.FC<CellProps> = ({ id, type, onClick, move }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!isClicked) {
      onClick(id);
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
