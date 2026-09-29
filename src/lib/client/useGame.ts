'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { GameView, HistoryEntry } from '../types';
import { ApiError, api } from './api';

/**
 * Live game state for the lobby. Replaces useDocumentData/useCollectionData:
 * loads once, takes the open seat, then follows the server's SSE stream.
 */
export function useGame(id: string) {
  const [game, setGame] = useState<GameView | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [error, setError] = useState<'not-found' | 'failed' | null>(null);
  const [live, setLive] = useState(false);
  const version = useRef(0);

  const accept = useCallback((next: GameView) => {
    if (next.version < version.current) return;
    version.current = next.version;
    setGame(next);
  }, []);

  useEffect(() => {
    let es: EventSource | null = null;
    let cancelled = false;

    api
      .join(id)
      .then((g) => {
        if (cancelled) return;
        accept(g);
        es = new EventSource(api.eventsUrl(id));
        es.addEventListener('game', (e) => accept(JSON.parse((e as MessageEvent).data)));
        es.onopen = () => setLive(true);
        es.onerror = () => setLive(false);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof ApiError && e.status === 404 ? 'not-found' : 'failed');
      });

    return () => {
      cancelled = true;
      es?.close();
    };
  }, [id, accept]);

  // History changes only when a round is won or a name changes; refetch per version.
  const v = game?.version;
  useEffect(() => {
    if (v === undefined) return;
    api.history(id).then(setHistory).catch(() => {});
  }, [id, v]);

  const move = useCallback(
    async (cell: number) => accept(await api.move(id, cell)),
    [id, accept],
  );
  const restart = useCallback(async () => accept(await api.restart(id)), [id, accept]);

  return { game, history, error, live, move, restart, setGame };
}
