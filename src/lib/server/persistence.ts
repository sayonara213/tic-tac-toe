import 'server-only';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { Data } from './store';

interface Persistence {
  load(): Promise<Data>;
  save(data: Data): Promise<void>;
}

const empty = (): Data => ({ users: {}, games: {} });

/** Local development: one JSON file, replaced atomically. */
function filePersistence(): Persistence {
  const dir = process.env.DATA_DIR || path.join(process.cwd(), '.data');
  const file = path.join(dir, 'db.json');
  return {
    async load() {
      try {
        return JSON.parse(await readFile(file, 'utf8')) as Data;
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
        return empty();
      }
    },
    async save(data) {
      await mkdir(dir, { recursive: true });
      const tmp = `${file}.${process.pid}.tmp`;
      await writeFile(tmp, JSON.stringify(data));
      await rename(tmp, file);
    },
  };
}

/**
 * Hosted (e.g. Render, whose free web services lose their disk on every
 * restart): one row per user/game as JSONB. Only rows that changed since the
 * last save are upserted.
 */
function postgresPersistence(url: string): Persistence {
  let pool: import('pg').Pool | null = null;
  const saved = new Map<string, string>(); // `${kind}:${id}` -> last saved JSON

  const getPool = async () => {
    if (pool) return pool;
    const { Pool } = await import('pg');
    pool = new Pool({ connectionString: url, max: 3 });
    await pool.query(
      `CREATE TABLE IF NOT EXISTS ttt_records (
         kind text NOT NULL,
         id text NOT NULL,
         data jsonb NOT NULL,
         PRIMARY KEY (kind, id)
       )`,
    );
    return pool;
  };

  return {
    async load() {
      const { rows } = await (await getPool()).query<{ kind: 'users' | 'games'; id: string; data: never }>(
        'SELECT kind, id, data FROM ttt_records',
      );
      const data = empty();
      for (const r of rows) {
        if (r.kind !== 'users' && r.kind !== 'games') continue;
        data[r.kind][r.id] = r.data;
        saved.set(`${r.kind}:${r.id}`, JSON.stringify(r.data));
      }
      return data;
    },
    async save(data) {
      const changed: [string, string, string][] = [];
      for (const kind of ['users', 'games'] as const) {
        for (const [id, record] of Object.entries(data[kind])) {
          const json = JSON.stringify(record);
          if (saved.get(`${kind}:${id}`) !== json) changed.push([kind, id, json]);
        }
      }
      if (changed.length === 0) return;
      const p = await getPool();
      const values = changed.map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3}::jsonb)`);
      await p.query(
        `INSERT INTO ttt_records (kind, id, data) VALUES ${values.join(', ')}
         ON CONFLICT (kind, id) DO UPDATE SET data = EXCLUDED.data`,
        changed.flat(),
      );
      for (const [kind, id, json] of changed) saved.set(`${kind}:${id}`, json);
    },
  };
}

export const persistence: Persistence = process.env.DATABASE_URL
  ? postgresPersistence(process.env.DATABASE_URL)
  : filePersistence();
