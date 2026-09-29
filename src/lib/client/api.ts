import type { GameSummary, GameView, HistoryEntry, PublicUser } from '../types';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    cache: 'no-store',
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, body.error ?? res.statusText);
  return body as T;
}

const post = <T>(path: string, body?: unknown) =>
  request<T>(path, { method: 'POST', body: body === undefined ? undefined : JSON.stringify(body) });

export const api = {
  session: () => post<PublicUser>('/api/session'),
  rename: (userName: string) =>
    request<PublicUser>('/api/me', { method: 'PATCH', body: JSON.stringify({ userName }) }),
  myGames: () => request<GameSummary[]>('/api/games'),
  createGame: () => post<GameView>('/api/games'),
  game: (id: string) => request<GameView>(`/api/games/${encodeURIComponent(id)}`),
  join: (id: string) => post<GameView>(`/api/games/${encodeURIComponent(id)}/join`),
  move: (id: string, cell: number) =>
    post<GameView>(`/api/games/${encodeURIComponent(id)}/move`, { cell }),
  restart: (id: string) => post<GameView>(`/api/games/${encodeURIComponent(id)}/restart`),
  history: (id: string) => request<HistoryEntry[]>(`/api/games/${encodeURIComponent(id)}/history`),
  eventsUrl: (id: string) => `/api/games/${encodeURIComponent(id)}/events`,
};
