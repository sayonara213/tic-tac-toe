'use client';

import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import Board from '@/components/Board';
import { Button, ButtonLink } from '@/components/Button';
import Loader from '@/components/Loader';
import Mark from '@/components/Mark';
import { ArrowLeftIcon, CopyIcon, LinkIcon } from '@/components/icons';
import { useToast } from '@/lib/client/toast';
import { useGame } from '@/lib/client/useGame';
import { useUser } from '@/lib/client/user';
import { cellName, markName, outcome, type Mark as M } from '@/lib/game';
import type { GameView, PlayerView } from '@/lib/types';

function Chip({ mark, size = 'md' }: { mark: M; size?: 'sm' | 'md' }) {
  return (
    <span
      className={`grid shrink-0 place-items-center ${size === 'sm' ? 'size-6 rounded-[6px]' : 'size-8 rounded-[8px]'} ${
        mark === 'circle' ? 'bg-o-fill text-o-ink' : 'bg-x-fill text-x-ink'
      }`}>
      <Mark mark={mark} animate={false} strokeWidth={14} className={size === 'sm' ? 'size-4' : 'size-5'} />
    </span>
  );
}

function Seat({ player, you, active, align }: { player: PlayerView; you: boolean; active: boolean; align: 'left' | 'right' }) {
  return (
    <div
      className={`flex min-w-0 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2 ${
        align === 'right' ? 'items-end text-right sm:flex-row-reverse' : 'items-start'
      }`}>
      <span className={`rounded-[10px] p-0.5 transition-shadow ${active ? 'ring-2 ring-accent' : ''}`}>
        <Chip mark={player.move} />
      </span>
      <div className='w-full min-w-0'>
        <p className='truncate text-sm font-semibold'>{player.uid ? player.userName : 'Waiting…'}</p>
        <p className='label !text-[10px]'>
          {markName(player.move)}
          {you ? ' · you' : ''}
        </p>
      </div>
    </div>
  );
}

/** Score strip: both seats and the running score, split by hairlines. */
function Score({ game, uid }: { game: GameView; uid: string }) {
  const [a, b] = game.players;
  const over = !!outcome(game.board);
  return (
    <section
      aria-label={`Score: ${a.userName || 'open seat'} ${a.winCount}, ${b.userName || 'open seat'} ${b.winCount}`}
      className='grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-md border border-glass-edge bg-glass-raised p-3'>
      <Seat player={a} you={a.uid === uid} active={!over && game.nextMove === a.move} align='left' />
      <p aria-hidden className='border-x border-glass-edge px-3 font-display text-xl font-medium tabular-nums sm:text-2xl'>
        {a.winCount}
        <span className='text-ink-muted'> – </span>
        {b.winCount}
      </p>
      <Seat player={b} you={b.uid === uid} active={!over && game.nextMove === b.move} align='right' />
    </section>
  );
}

function statusFor(game: GameView, uid: string) {
  const me = game.players.find((p) => p.uid === uid);
  const r = outcome(game.board);
  if (r) {
    if (r.winner === 'draw') return "It's a draw";
    const winner = game.players.find((p) => p.move === r.winner)!;
    if (!me) return `${winner.userName} wins`;
    return winner.uid === uid ? 'You won!' : `${winner.userName} wins`;
  }
  if (!me) return `Watching · ${markName(game.nextMove)} to move`;
  if (game.players[1].uid === '') return 'Waiting for a friend to join';
  return me.move === game.nextMove ? 'Your turn' : 'Their turn';
}

export default function Lobby() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const uid = user!.uid;
  const notify = useToast();
  const { game, history, error, live, move, restart, setGame } = useGame(id);
  const [announce, setAnnounce] = useState('');
  const prev = useRef<GameView | null>(null);

  // Announce what changed for screen reader users.
  useEffect(() => {
    if (!game) return;
    const before = prev.current;
    prev.current = game;
    if (!before) return;
    const placed = game.board.findIndex((v, i) => v !== 'empty' && before.board[i] === 'empty');
    const parts: string[] = [];
    if (placed >= 0) parts.push(`${markName(game.board[placed])} at ${cellName(placed)}.`);
    if (before.players[1].uid === '' && game.players[1].uid !== '') parts.push(`${game.players[1].userName} joined.`);
    if (game.board.every((v) => v === 'empty') && before.board.some((v) => v !== 'empty')) parts.push('New round.');
    parts.push(statusFor(game, uid) + '.');
    setAnnounce(parts.join(' '));
  }, [game, uid]);

  const me = game?.players.find((p) => p.uid === uid);
  const celebrate = useCallback((winner: M) => me?.move === winner, [me?.move]);

  if (error) {
    return (
      <div className='flex flex-col items-center gap-4 py-10 text-center'>
        <h1 className='font-display text-xl font-semibold'>
          {error === 'not-found' ? 'Game not found' : 'Could not load this game'}
        </h1>
        <ButtonLink href='/' variant='primary'>
          Back home
        </ButtonLink>
      </div>
    );
  }
  if (!game) return <Loader label='Loading game' />;

  const result = outcome(game.board);
  const canPlay = !!me && !result && me.move === game.nextMove;

  const play = async (cell: number) => {
    if (!me) return;
    // Optimistic: show the mark now, the server's answer replaces it.
    const optimistic = { ...game, board: game.board.slice(), nextMove: me.move === 'circle' ? 'cross' : 'circle' } as GameView;
    optimistic.board[cell] = me.move;
    setGame(optimistic);
    try {
      await move(cell);
    } catch (e) {
      setGame(game);
      notify((e as Error).message, 'error');
    }
  };

  const onRestart = async () => {
    try {
      await restart();
    } catch (e) {
      notify((e as Error).message, 'error');
    }
  };

  const copy = async (text: string, what: string) => {
    try {
      await navigator.clipboard.writeText(text);
      notify(`${what} copied`, 'success');
    } catch {
      notify(`Could not copy the ${what.toLowerCase()}`, 'error');
    }
  };

  return (
    <>
      <div className='flex items-center justify-between gap-2'>
        <ButtonLink href='/' variant='ghost' className='-ml-2 !px-2'>
          <ArrowLeftIcon /> Home
        </ButtonLink>
        <h1 className='label flex items-center gap-2'>
          Online game
          <span
            className={`size-2 rounded-full ${live ? 'bg-accent' : 'bg-ink-muted'}`}
            title={live ? 'Live' : 'Reconnecting'}
            aria-label={live ? 'Live' : 'Reconnecting'}
            role='img'
          />
        </h1>
      </div>

      <Score game={game} uid={uid} />

      <p className='text-center font-display text-lg font-medium' aria-hidden>
        {statusFor(game, uid)}
      </p>
      <p className='sr-only' aria-live='polite'>
        {announce}
      </p>

      <div className='mx-auto w-full max-w-[420px]'>
        <Board
          board={game.board}
          playable={canPlay ? me!.move : null}
          onPlay={play}
          celebrate={celebrate}
          label={me ? `Board, you play ${markName(me.move)}` : 'Board'}
        />
      </div>

      {me && (
        <Button
          variant={result ? 'primary' : 'secondary'}
          onClick={onRestart}
          aria-disabled={!result}
          disabled={!result}
          className='min-h-12'>
          {result ? 'RESTART' : 'RESTART (after this round)'}
        </Button>
      )}

      <div className='grid grid-cols-2 gap-2'>
        <Button onClick={() => copy(game.id, 'Game ID')}>
          <CopyIcon /> Copy Id
        </Button>
        <Button onClick={() => copy(window.location.href, 'Link')}>
          <LinkIcon /> Copy Link
        </Button>
      </div>

      {history.length > 0 && (
        <section aria-labelledby='history' className='flex flex-col gap-2'>
          <h2 id='history' className='label'>
            History
          </h2>
          <ol className='flex max-h-64 flex-col gap-1.5 overflow-y-auto pr-1'>
            {history.map((h) => (
              <li
                key={h.timestamp}
                className='flex items-center justify-between gap-3 rounded-md border border-glass-edge bg-glass-raised px-3 py-2'>
                <span className='min-w-0 truncate text-sm font-semibold'>
                  {h.winnerName}
                  <span className='sr-only'> won as {markName(h.move)}</span>
                </span>
                <span className='flex items-center gap-2'>
                  <time dateTime={h.timestamp} className='text-xs text-ink-muted tabular-nums'>
                    {new Date(h.timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                  </time>
                  <span aria-hidden>
                    <Chip mark={h.move} size='sm' />
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}
    </>
  );
}
