import 'server-only';
import type { Board, Mark } from '../game';
import { persistence } from './persistence';

// The whole dataset lives in memory on one Node server (`next start`) and every
// mutation is flushed, one write at a time, to a Postgres table when
// DATABASE_URL is set, or to a JSON file otherwise. This replaces Firestore.

export interface UserRecord {
  uid: string;
  userName: string;
  tokenHash: string;
  createdAt: string;
}

export interface PlayerRecord {
  uid: string;
  move: Mark;
  winCount: number;
}

export interface HistoryRecord {
  move: Mark;
  winner: string;
  timestamp: string;
}

export interface GameRecord {
  id: string;
  players: [PlayerRecord, PlayerRecord];
  board: Board;
  nextMove: Mark;
  isWin: boolean;
  date: string;
  history: HistoryRecord[];
  version: number;
}

export interface Data {
  users: Record<string, UserRecord>;
  games: Record<string, GameRecord>;
}

class Db {
  private data: Data | null = null;
  private loading: Promise<Data> | null = null;
  private writing: Promise<void> = Promise.resolve();
  private dirty = false;

  private async load(): Promise<Data> {
    if (this.data) return this.data;
    this.loading ??= persistence
      .load()
      .then((data) => (this.data = data))
      .catch((err) => {
        this.loading = null; // retry on the next request
        throw err;
      });
    return this.loading;
  }

  async read<T>(fn: (data: Data) => T): Promise<T> {
    return fn(await this.load());
  }

  /** Runs `fn` against the live data, then persists. `fn` must be synchronous. */
  async write<T>(fn: (data: Data) => T): Promise<T> {
    const data = await this.load();
    const result = fn(data);
    this.dirty = true;
    this.writing = this.writing.then(() => this.flush());
    await this.writing;
    return result;
  }

  private async flush() {
    if (!this.dirty || !this.data) return;
    this.dirty = false;
    try {
      await persistence.save(this.data);
    } catch (err) {
      this.dirty = true; // keep it for the next write
      console.error('Saving game data failed', err);
    }
  }
}

// Survive dev hot reloads without losing the in-memory copy.
const g = globalThis as unknown as { __tttDb?: Db };
export const db = (g.__tttDb ??= new Db());
