import { TMove } from '../models/game/field/FieldEntity';

export interface IUser {
  uid: string;
  userName: string;
}

export interface IPlayer {
  uid: string;
  move: TMove;
  winCount: number;
}
