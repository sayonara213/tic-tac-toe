import { IPlayer, IUser } from '../../../types/user.types';

export interface IGameHistoryProps {
  gameId: string;
  players: IPlayer[];
}
