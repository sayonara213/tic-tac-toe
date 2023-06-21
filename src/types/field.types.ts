import { TMove } from '../models/game/field/FieldEntity';

export interface IPlayer {
  move: TMove;
  name: string;
}

export interface IFetchField {
  id: string;
  field: string;
  players: IPlayer[];
  nextMove: TMove;
  date: Date;
}
