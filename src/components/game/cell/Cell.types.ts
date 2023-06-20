import { CellType } from '../../../models/game/cell/CellEntity';
import { TMove } from '../../../models/game/field/FieldEntity';

export interface CellProps {
  id: number;
  type: CellType;
  onClick: (id: number) => void;
  move: TMove;
}
