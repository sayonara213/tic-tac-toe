import 'server-only';
import { createHash, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { db, type UserRecord } from './store';

// Anonymous accounts, like the old app: the first visit creates "User xxxxx".
// The user id is public (it appears in games); a separate secret token in an
// httpOnly cookie proves ownership, so nobody can act as another player.

const COOKIE = 'ttt_session';
const ONE_YEAR = 60 * 60 * 24 * 365;

const hash = (token: string) => createHash('sha256').update(token).digest('hex');

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export async function currentUser(): Promise<UserRecord | null> {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return null;
  const [uid, token] = raw.split('.');
  if (!uid || !token) return null;
  return db.read(({ users }) => {
    const user = users[uid];
    return user && safeEqual(user.tokenHash, hash(token)) ? user : null;
  });
}

/** Returns the signed-in user, creating one (and setting the cookie) if needed. */
export async function ensureUser(): Promise<UserRecord> {
  const existing = await currentUser();
  if (existing) return existing;

  const uid = randomUUID().replace(/-/g, '').slice(0, 20);
  const token = randomBytes(32).toString('base64url');
  const user: UserRecord = {
    uid,
    userName: `User ${uid.slice(0, 5)}`,
    tokenHash: hash(token),
    createdAt: new Date().toISOString(),
  };
  await db.write(({ users }) => {
    users[uid] = user;
  });
  (await cookies()).set(COOKIE, `${uid}.${token}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ONE_YEAR,
  });
  return user;
}

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function requireUser(): Promise<UserRecord> {
  const user = await currentUser();
  if (!user) throw new HttpError(401, 'Not signed in');
  return user;
}

/** Wraps a route handler so thrown HttpErrors become JSON responses. */
export function handle<A extends unknown[]>(fn: (...args: A) => Promise<Response>) {
  return async (...args: A): Promise<Response> => {
    try {
      return await fn(...args);
    } catch (err) {
      if (err instanceof HttpError) {
        return Response.json({ error: err.message }, { status: err.status });
      }
      console.error(err);
      return Response.json({ error: 'Something went wrong' }, { status: 500 });
    }
  };
}

export async function readJson<T>(req: Request): Promise<Partial<T>> {
  try {
    const body = await req.json();
    return body && typeof body === 'object' ? body : {};
  } catch {
    return {};
  }
}
