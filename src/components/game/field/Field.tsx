import React from 'react';

import { FieldStyled as Styled } from './Field.styled';
import Cell from '../cell/Cell';
import { FieldEntity } from '../../../models/game/field/FieldEntity';
import { CellType } from '../../../models/game/cell/CellEntity';
import { GameEntity, TGameMode } from '../../../models/game/game/GameEntity';

interface FieldProps {
  field: FieldEntity;
  setField: (field: FieldEntity) => void;
  game: GameEntity;
}

const Field: React.FC<FieldProps> = ({ field, setField, game }) => {
  const setCellType = (id: number) => {
    const newField = new FieldEntity();
    newField.copy(field);
    game.gameMode === 'single'
      ? newField.playerMove(id)
      : newField.multiplayerMove(id, game.playerOne);
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
