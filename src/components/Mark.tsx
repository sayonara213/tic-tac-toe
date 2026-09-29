import type { Mark as MarkType } from '@/lib/game';

/** O and X drawn as strokes that ink themselves in (skipped under reduced motion). */
export default function Mark({
  mark,
  className = '',
  animate = true,
  strokeWidth = 12,
}: {
  mark: MarkType;
  className?: string;
  animate?: boolean;
  strokeWidth?: number;
}) {
  const draw = animate
    ? '[stroke-dasharray:1] [stroke-dashoffset:1] motion-safe:animate-[ink_260ms_ease-out_forwards] motion-reduce:[stroke-dashoffset:0]'
    : '';
  return (
    <svg
      viewBox='0 0 100 100'
      className={className}
      fill='none'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      aria-hidden>
      {mark === 'circle' ? (
        <circle cx='50' cy='50' r='30' pathLength={1} className={draw} transform='rotate(-90 50 50)' />
      ) : (
        <>
          <path d='M28 28 72 72' pathLength={1} className={draw} />
          <path
            d='M72 28 28 72'
            pathLength={1}
            className={`${draw} ${animate ? '[animation-delay:120ms]' : ''}`}
          />
        </>
      )}
    </svg>
  );
}
