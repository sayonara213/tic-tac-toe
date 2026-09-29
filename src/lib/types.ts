import type { Board, Mark } from './game';

/** Shapes returned by the API. Mirrors the old Firestore documents. */

export interface PublicUser {
  uid: string;
  userName: string;
}

export interface PlayerView {
  uid: string; // '' while the seat is open
  userName: string;
  move: Mark;
  winCount: number;
}

export interface HistoryEntry {
  move: Mark;
  winner: string;
  winnerName: string;
  timestamp: string;
}

export interface GameView {
  id: string;
  players: [PlayerView, PlayerView];
  board: Board;
  nextMove: Mark;
  isWin: boolean;
  date: string;
  /** Monotonic counter so clients can drop stale updates. */
  version: number;
}

export interface GameSummary {
  id: string;
  players: [PlayerView, PlayerView];
  board: Board;
  date: string;
}
