import type { SVGProps } from 'react';

// Inline icons (replace the old PNG/SVG pairs, so they follow the theme via currentColor).

type P = SVGProps<SVGSVGElement>;
const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

export const EditIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d='M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z' />
    <path d='m13.5 6.5 4 4' />
  </svg>
);
export const CheckIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d='m5 12.5 4.5 4.5L19 7.5' />
  </svg>
);
export const CloseIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d='M6 6l12 12M18 6 6 18' />
  </svg>
);
export const MoonIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d='M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z' />
  </svg>
);
export const SunIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx='12' cy='12' r='4' />
    <path d='M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4' />
  </svg>
);
export const WavesIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d='M2 8c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2' />
    <path d='M2 13c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2' />
    <path d='M2 18c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2' />
  </svg>
);
export const CopyIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x='8' y='8' width='12' height='12' rx='2.5' />
    <path d='M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8' />
  </svg>
);
export const LinkIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d='M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1' />
    <path d='M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1' />
  </svg>
);
export const ArrowLeftIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d='M19 12H5M11 6l-6 6 6 6' />
  </svg>
);
