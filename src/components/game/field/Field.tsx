import React from 'react';

import { FieldStyled as Styled } from './Field.styled';
import Cell from '../cell/Cell';
import { FieldEntity } from '../../../models/game/field/FieldEntity';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../global/App';
import { FieldProps } from './Field.types';

const Field: React.FC<FieldProps> = ({ field, setField, playerMove, gameId, canMove }) => {
  const setCellType = async (id: number) => {
    const newField = new FieldEntity();
    newField.copy(field);
    const isMoved = newField.multiplayerMove(id, playerMove);
    isMoved && (await handleMultiplayerMove());
    setField(newField);
  };

  const handleMultiplayerMove = async () => {
    await updateDoc(doc(db, 'game', gameId), {
      field: JSON.stringify(field.cells),
      nextMove: field?.move === 'circle' ? 'cross' : 'circle',
    });
  };

  return (
    <Styled.Container>
      {field.cells.map((cell) => (
        <Cell key={cell.id} type={cell.type} id={cell.id} onClick={setCellType} move={playerMove} />
      ))}
    </Styled.Container>
  );
};

export default Field;
