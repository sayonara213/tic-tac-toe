import React from 'react';

import { FieldStyled as Styled } from './Field.styled';
import Cell from '../cell/Cell';
import { FieldEntity } from '../../../models/game/field/FieldEntity';
import { CellType } from '../../../models/game/cell/CellEntity';

interface FieldProps {
  field: FieldEntity;
  setField: (field: FieldEntity) => void;
}

const Field: React.FC<FieldProps> = ({ field, setField }) => {
  const setCellType = (id: number, type: CellType) => {
    const newField = new FieldEntity();
    newField.copy(field);
    newField.playerMove(id);
    setField(newField);
  };

  return (
    <Styled.Container>
      {field.cells.map((cell) => (
        <Cell key={cell.id} type={cell.type} id={cell.id} onClick={setCellType} move={field.move} />
      ))}
    </Styled.Container>
  );
};

export default Field;
