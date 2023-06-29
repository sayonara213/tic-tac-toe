import { FieldEntity, TMove } from '../../../models/game/field/FieldEntity';
import { GameEntity } from '../../../models/game/game/GameEntity';

export interface FieldProps {
  field: FieldEntity;
  setField: (field: FieldEntity) => void;
  playerMove: TMove;
  gameId: string;
  canMove: boolean;
}
