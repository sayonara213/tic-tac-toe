import { TMove } from '../models/game/field/FieldEntity';

export interface IPlayer {
  move: TMove;
  uid: string;
  winCount: number;
}

export interface IFetchField {
  id: string;
  field: string;
  players: IPlayer[];
  nextMove: TMove;
  date: Date;
}

export interface IHistory {
  move: TMove;
  timestamp: Date;
  winner: string;
}
