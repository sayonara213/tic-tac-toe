import React, { useEffect, useState } from 'react';

import { FieldStyled as Styled } from './Field.styled';
import Cell from '../cell/Cell';
import { FieldEntity } from './FieldEntity';
import { CellEntity, CellType } from '../cell/CellEntity';
import Confetti from 'react-confetti';

interface FieldProps {
  field: FieldEntity;
  setField: (field: FieldEntity) => void;
}

const Field: React.FC<FieldProps> = ({ field, setField }) => {
  const setCellType = (id: number, type: CellType) => {
    const newField = new FieldEntity();
    newField.cells = [...field.cells];
    const cell = newField.cells.find((cell) => cell.id === id);
    if (cell?.type === 'empty') {
      field.move === 'circle' ? cell.setCircle() : cell.setCross();
      newField.setMove(field.move === 'circle' ? 'cross' : 'circle');
      setField(newField);
    }
  };

  return (
    <>
      <Styled.Container>
        {field.cells.map((cell) => (
          <Cell
            key={cell.id}
            type={cell.type}
            id={cell.id}
            onClick={setCellType}
            move={field.move}
          />
        ))}
      </Styled.Container>
    </>
  );
};

export default Field;
