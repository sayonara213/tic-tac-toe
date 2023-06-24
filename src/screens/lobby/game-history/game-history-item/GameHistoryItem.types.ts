import { TMove } from '../../../../models/game/field/FieldEntity';
import { IUser } from '../../../../types/user.types';

export interface IGameHistoryItemProps {
  winColor: TMove;
  player: string;
  date: Date;
}
