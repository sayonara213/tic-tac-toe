import React, { useEffect, useState } from 'react';

import { FieldStyled as Styled } from './Field.styled';
import Cell from '../cell/Cell';
import { FieldEntity } from './FieldEntity';
import { CellEntity, CellType } from '../cell/CellEntity';

const fieldEntity = new FieldEntity(
  Array(9)
    .fill(null)
    .map((_, index) => new CellEntity(index, 'cross')),
);

const Field: React.FC = () => {
  const [field, setField] = useState(fieldEntity);

  const setCellType = (id: number, type: CellType) => {
    fieldEntity.setCellType(id, type);
    setField(null as any);
    setField(fieldEntity);
  };

  return (
    <Styled.Container>
      {field.cells.map((cell) => (
        <Cell key={cell.id} type={cell.type} id={cell.id} onClick={setCellType} />
      ))}
    </Styled.Container>
  );
};

export default Field;
