'use client';

import { useCallback, useState } from 'react';
import Board from '@/components/Board';
import { Button, ButtonLink } from '@/components/Button';
import Mark from '@/components/Mark';
import { ArrowLeftIcon } from '@/components/icons';
import { cellName, emptyBoard, markName, other, outcome, place, type Board as B, type Mark as M } from '@/lib/game';

/** Two players sharing one device, as before. */
export default function SinglePlayer() {
  const [board, setBoard] = useState<B>(emptyBoard);
  const [turn, setTurn] = useState<M>('circle');
  const [announce, setAnnounce] = useState('');
  const result = outcome(board);

  const play = (cell: number) => {
    const next = place(board, cell, turn);
    if (!next) return;
    setBoard(next);
    setTurn(other(turn));
    const r = outcome(next);
    setAnnounce(
      `${markName(turn)} at ${cellName(cell)}. ` +
        (r ? (r.winner === 'draw' ? "It's a draw." : `${markName(r.winner)} wins!`) : `${markName(other(turn))} to move.`),
    );
  };

  const restart = () => {
    setBoard(emptyBoard());
    setTurn('circle');
    setAnnounce('New round. O to move.');
  };

  const celebrate = useCallback(() => true, []);

  const status = result
    ? result.winner === 'draw'
      ? "It's a draw"
      : `${markName(result.winner)} wins!`
    : `${markName(turn)} to move`;
  const statusMark = result ? (result.winner === 'draw' ? null : result.winner) : turn;

  return (
    <>
      <div className='flex items-center justify-between gap-2'>
        <ButtonLink href='/' variant='ghost' className='-ml-2 !px-2'>
          <ArrowLeftIcon /> Home
        </ButtonLink>
        <h1 className='label'>Singleplayer</h1>
      </div>

      <div className='flex items-center justify-center gap-3 rounded-md border border-glass-edge bg-glass-raised px-4 py-3'>
        {statusMark && (
          <span
            className={`grid size-8 place-items-center rounded-[8px] ${
              statusMark === 'circle' ? 'bg-o-fill text-o-ink' : 'bg-x-fill text-x-ink'
            }`}>
            <Mark mark={statusMark} animate={false} strokeWidth={14} className='size-5' />
          </span>
        )}
        <p className='font-display text-lg font-medium' aria-hidden>
          {status}
        </p>
      </div>
      <p className='sr-only' aria-live='polite'>
        {announce}
      </p>

      <div className='mx-auto w-full max-w-[420px]'>
        <Board board={board} playable={result ? null : turn} onPlay={play} celebrate={celebrate} />
      </div>

      <Button variant={result ? 'primary' : 'secondary'} onClick={restart} className='min-h-12'>
        RESTART
      </Button>
    </>
  );
}
