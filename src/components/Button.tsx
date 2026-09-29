import Link from 'next/link';
import type { ComponentProps } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const styles: Record<Variant, string> = {
  primary: 'bg-accent text-on-accent hover:brightness-110 shadow-tile',
  secondary: 'bg-glass-raised text-ink border border-glass-edge hover:bg-glass-raised/80 hover:border-ink-muted/40',
  ghost: 'text-ink hover:bg-glass-raised',
};

export const buttonClass = (variant: Variant = 'secondary', extra = '') =>
  `inline-flex min-h-11 select-none items-center justify-center gap-2 rounded-sm px-4 text-sm font-bold transition-[transform,filter,background-color,border-color] duration-150 active:scale-96 disabled:pointer-events-none disabled:opacity-50 aria-disabled:opacity-50 ${styles[variant]} ${extra}`;

export function Button({
  variant = 'secondary',
  className = '',
  type = 'button',
  ...props
}: ComponentProps<'button'> & { variant?: Variant }) {
  return <button type={type} className={buttonClass(variant, className)} {...props} />;
}

export function ButtonLink({
  variant = 'secondary',
  className = '',
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

/** Square icon button; `label` is required so it always has an accessible name. */
export function IconButton({
  label,
  className = '',
  ...props
}: ComponentProps<'button'> & { label: string }) {
  return (
    <button
      type='button'
      aria-label={label}
      title={label}
      className={buttonClass('ghost', `!min-h-11 !w-11 !px-0 ${className}`)}
      {...props}
    />
  );
}
