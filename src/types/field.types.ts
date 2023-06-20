import { TMove } from '../models/game/field/FieldEntity';

export interface IPlayer {
  move: TMove;
  name: string;
}

export interface IFetchField {
  field: string;
  players: IPlayer[];
}
