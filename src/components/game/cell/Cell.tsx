import React from 'react';

import { CellStyled as Styled } from './Cell.styled';
import { CellType } from './CellEntity';

interface CellProps {
  id: number;
  type: CellType;
  onClick: (id: number, type: CellType) => void;
}

const Cell: React.FC<CellProps> = ({ id, type, onClick }) => {
  return <Styled.Container type={type} onClick={() => onClick(id, 'circle')} />;
};

export default Cell;
