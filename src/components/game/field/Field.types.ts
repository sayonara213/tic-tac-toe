import { FieldEntity } from '../../../models/game/field/FieldEntity';
import { GameEntity } from '../../../models/game/game/GameEntity';

export interface FieldProps {
  field: FieldEntity;
  setField: (field: FieldEntity) => void;
  game: GameEntity;
  gameId: string;
}
