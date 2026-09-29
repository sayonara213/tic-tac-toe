import type { Board } from '@/lib/game';

const fill = { empty: 'bg-glass', circle: 'bg-o-fill', cross: 'bg-x-fill' } as const;

/** Thumbnail of a board for the game list. Decorative: the row text carries the meaning. */
export default function MiniBoard({ board }: { board: Board }) {
  return (
    <div aria-hidden className='grid size-14 shrink-0 grid-cols-3 gap-0.5 rounded-[8px] bg-well p-1'>
      {board.map((v, i) => (
        <span key={i} className={`rounded-[3px] ${fill[v]}`} />
      ))}
    </div>
  );
}
