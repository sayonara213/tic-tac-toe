import 'server-only';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { Board, Mark } from '../game';

// A small JSON-file database. The whole dataset lives in memory and every
// mutation is flushed to disk with an atomic rename, one write at a time.
// It replaces Firestore for a single Node server (`next start`). To scale out,
// reimplement `Db` against Postgres/Redis; nothing else touches storage.

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

interface Data {
  users: Record<string, UserRecord>;
  games: Record<string, GameRecord>;
}

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), '.data');
const FILE = path.join(DATA_DIR, 'db.json');

class Db {
  private data: Data | null = null;
  private loading: Promise<Data> | null = null;
  private writing: Promise<void> = Promise.resolve();
  private dirty = false;

  private async load(): Promise<Data> {
    if (this.data) return this.data;
    this.loading ??= (async () => {
      try {
        this.data = JSON.parse(await readFile(FILE, 'utf8')) as Data;
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
        this.data = { users: {}, games: {} };
      }
      return this.data;
    })();
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
    await mkdir(DATA_DIR, { recursive: true });
    const tmp = `${FILE}.${process.pid}.tmp`;
    await writeFile(tmp, JSON.stringify(this.data));
    await rename(tmp, FILE);
  }
}

// Survive dev hot reloads without losing the in-memory copy.
const g = globalThis as unknown as { __tttDb?: Db };
export const db = (g.__tttDb ??= new Db());
