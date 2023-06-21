import { TMove } from '../models/game/field/FieldEntity';

export interface IPlayer {
  move: TMove;
  uid: string;
}

export interface IFetchField {
  id: string;
  field: string;
  players: IPlayer[];
  nextMove: TMove;
  date: Date;
}
