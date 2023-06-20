import React, { useEffect, useState } from 'react';
import { IMiniFieldProps } from './MiniField.types';

import { MiniFieldStyled as Styled } from './MiniField.styled';
import { CellEntity } from '../../../models/game/cell/CellEntity';

const MiniField: React.FC<IMiniFieldProps> = ({ field, onClick }) => {
  const [cells, setCells] = useState<CellEntity[]>([]);

  useEffect(() => {
    const objField = JSON.parse(field) as any;
    setCells(objField);
  }, []);

  return (
    <Styled.Container>
      {cells.map((cell, index) => (
        <Styled.Cell key={index} type={cell.type} />
      ))}
    </Styled.Container>
  );
};

export default MiniField;
