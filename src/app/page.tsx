'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, ButtonLink } from '@/components/Button';
import MiniBoard from '@/components/MiniBoard';
import { ApiError, api } from '@/lib/client/api';
import { useToast } from '@/lib/client/toast';
import { useUser } from '@/lib/client/user';
import type { GameSummary } from '@/lib/types';

function GameList() {
  const { user } = useUser();
  const [games, setGames] = useState<GameSummary[] | null>(null);

  useEffect(() => {
    api
      .myGames()
      .then(setGames)
      .catch(() => setGames([]));
  }, []);

  if (games === null) {
    return (
      <ul aria-busy className='flex flex-col gap-2' aria-label='Loading your games'>
        {[0, 1, 2].map((i) => (
          <li key={i} className='h-[72px] animate-pulse rounded-md bg-glass-raised' />
        ))}
      </ul>
    );
  }
  if (games.length === 0) {
    return <p className='text-sm text-ink-muted'>Games you start or join will show up here.</p>;
  }

  return (
    <ul className='flex flex-col gap-2'>
      {games.map((g, i) => {
        const full = g.players[1].uid !== '';
        const names = g.players
          .map((p) => (p.uid ? p.userName : 'waiting…'))
          .join(' vs ');
        const mine = g.players.some((p) => p.uid === user?.uid);
        return (
          <li
            key={g.id}
            className='motion-safe:animate-rise flex items-center gap-3 rounded-md border border-glass-edge bg-glass-raised p-2 pr-3'
            style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
            <MiniBoard board={g.board} />
            <div className='min-w-0 flex-1'>
              <p className='truncate text-sm font-semibold'>{names}</p>
              <p className='text-xs text-ink-muted'>
                <time dateTime={g.date}>
                  {new Date(g.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </time>
              </p>
            </div>
            <ButtonLink
              href={`/game/${g.id}`}
              className='w-24 shrink-0'
              aria-label={`${full && !mine ? 'Watch' : full ? 'Open' : 'Join'} game: ${names}`}>
              {full ? 'WATCH' : 'JOIN'}
            </ButtonLink>
          </li>
        );
      })}
    </ul>
  );
}

export default function Home() {
  const router = useRouter();
  const notify = useToast();
  const [gameId, setGameId] = useState('');
  const [busy, setBusy] = useState<'create' | 'join' | null>(null);

  const createGame = async () => {
    setBusy('create');
    try {
      const game = await api.createGame();
      router.push(`/game/${game.id}`);
    } catch (e) {
      notify((e as Error).message, 'error');
      setBusy(null);
    }
  };

  const joinGame = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = gameId.trim();
    if (!id) {
      notify('Game ID is required', 'error');
      return;
    }
    setBusy('join');
    try {
      await api.game(id);
      notify('Game joined');
      router.push(`/game/${id}`);
    } catch (err) {
      notify(err instanceof ApiError && err.status === 404 ? 'Game not found' : 'Error occurred', 'error');
      setBusy(null);
    }
  };

  return (
    <>
      <h1 className='sr-only'>tictactoe</h1>
      <section aria-label='Start a game' className='grid gap-2 sm:grid-cols-2'>
        <ButtonLink href='/game/single' className='min-h-12'>
          Start singleplayer
        </ButtonLink>
        <Button variant='primary' onClick={createGame} disabled={busy !== null} className='min-h-12'>
          {busy === 'create' ? 'Creating…' : 'Start online'}
        </Button>
      </section>

      <form onSubmit={joinGame} className='flex gap-2' aria-label='Join a game by ID'>
        <label htmlFor='game-id' className='sr-only'>
          Game ID
        </label>
        <input
          id='game-id'
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          placeholder='Game ID…'
          autoComplete='off'
          autoCapitalize='off'
          spellCheck={false}
          className='h-11 min-w-0 flex-1 rounded-sm border border-glass-edge bg-well px-3 text-sm font-semibold text-ink placeholder:text-ink-muted'
        />
        <Button type='submit' disabled={busy !== null} className='w-24'>
          {busy === 'join' ? '…' : 'JOIN'}
        </Button>
      </form>

      <section aria-labelledby='your-games' className='flex flex-col gap-3'>
        <h2 id='your-games' className='label'>
          Your games
        </h2>
        <GameList />
      </section>
    </>
  );
}
