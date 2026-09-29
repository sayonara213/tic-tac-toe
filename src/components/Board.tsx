'use client';

import { useEffect, useRef, useState } from 'react';
import { centerOf, fx } from '@/lib/client/fx';
import { cellName, markName, outcome as getOutcome, type Board as BoardT, type Mark as M } from '@/lib/game';
import Mark from './Mark';

interface Props {
  board: BoardT;
  /** Mark shown as a hover/focus preview and placed on tap; null when you can't move. */
  playable: M | null;
  onPlay: (cell: number) => void;
  /** Whether a win belongs to this viewer (rising bubbles) or someone else. */
  celebrate: (winner: M) => boolean;
  label?: string;
}

const tone = (m: M) => (m === 'circle' ? 'o' : 'x');

/**
 * The 3x3 board: nine real buttons in a recessed tray. Arrow keys move between
 * cells (one tab stop), Enter/Space place a mark. Each cell announces its
 * position and contents; blocked cells stay focusable but aria-disabled.
 */
export default function Board({ board, playable, onPlay, celebrate, label = 'Board' }: Props) {
  const cells = useRef<(HTMLButtonElement | null)[]>([]);
  const prev = useRef<BoardT | null>(null);
  const [focus, setFocus] = useState(4);
  const result = getOutcome(board);
  const winLine = result && result.winner !== 'draw' ? result.line : [];

  // Effects for marks that just appeared and for the round ending.
  useEffect(() => {
    const before = prev.current;
    prev.current = board;
    if (!before) return;
    const placed = board.findIndex((v, i) => v !== 'empty' && before[i] === 'empty');
    if (placed >= 0 && cells.current[placed]) {
      const { x, y } = centerOf(cells.current[placed]!);
      fx.emit({ type: 'ripple', x, y, tone: tone(board[placed] as M) });
    }
    const was = getOutcome(before);
    const now = getOutcome(board);
    if (!was && now) {
      const points = (now.winner === 'draw' ? [...board.keys()] : now.line).map((i) =>
        centerOf(cells.current[i]!),
      );
      setTimeout(() => {
        if (now.winner === 'draw') fx.emit({ type: 'draw', points });
        else fx.emit({ type: 'win', points, tone: tone(now.winner), celebrate: celebrate(now.winner) });
      }, 180);
    }
  }, [board, celebrate]);

  const move = (to: number) => {
    setFocus(to);
    cells.current[to]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const r = Math.floor(i / 3);
    const c = i % 3;
    const map: Record<string, number> = {
      ArrowUp: ((r + 2) % 3) * 3 + c,
      ArrowDown: ((r + 1) % 3) * 3 + c,
      ArrowLeft: r * 3 + ((c + 2) % 3),
      ArrowRight: r * 3 + ((c + 1) % 3),
      Home: r * 3,
      End: r * 3 + 2,
    };
    if (e.key in map) {
      e.preventDefault();
      move(map[e.key]);
    }
  };

  return (
    <div
      role='group'
      aria-label={label}
      aria-describedby='board-help'
      className='grid aspect-square w-full grid-cols-3 grid-rows-3 gap-2 rounded-lg bg-well p-2 sm:gap-3 sm:p-3'>
      <p id='board-help' className='sr-only'>
        Use arrow keys to move between cells. Press Enter to place your mark.
      </p>
      {board.map((value, i) => {
        const open = value === 'empty' && !!playable && !result;
        const winning = winLine.includes(i);
        const fill =
          value === 'empty'
            ? 'bg-glass'
            : winning
              ? 'bg-pearl text-pearl-ink shadow-pearl motion-safe:animate-merge'
              : value === 'circle'
                ? 'bg-o-fill text-o-ink shadow-tile'
                : 'bg-x-fill text-x-ink shadow-tile';
        return (
          <button
            key={i}
            ref={(el) => {
              cells.current[i] = el;
            }}
            type='button'
            tabIndex={focus === i ? 0 : -1}
            aria-label={`${cellName(i)}, ${markName(value)}${winning ? ', winning line' : ''}`}
            aria-disabled={!open}
            onFocus={() => setFocus(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            onClick={() => open && onPlay(i)}
            className={`group relative grid place-items-center rounded-md transition-[background-color,box-shadow,transform] duration-200 ${fill} ${
              open ? 'cursor-pointer hover:bg-glass-raised active:scale-96' : 'cursor-default'
            } ${winLine.length > 0 && !winning ? 'opacity-70' : ''}`}
            style={winning ? { animationDelay: `${winLine.indexOf(i) * 90 + 180}ms` } : undefined}>
            {value !== 'empty' ? (
              <Mark key={value} mark={value} className='size-[62%] motion-safe:animate-pop' />
            ) : (
              open && (
                <Mark
                  mark={playable!}
                  animate={false}
                  className='size-[50%] text-ink opacity-0 transition-opacity duration-150 group-hover:opacity-25 group-focus-visible:opacity-25'
                />
              )
            )}
          </button>
        );
      })}
    </div>
  );
}
