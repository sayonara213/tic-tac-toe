'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePrefs } from '@/lib/client/prefs';
import { useToast } from '@/lib/client/toast';
import { useUser } from '@/lib/client/user';
import { IconButton } from './Button';
import { CheckIcon, CloseIcon, EditIcon, MoonIcon, SunIcon, WavesIcon } from './icons';

function Logo() {
  return (
    <Link
      href='/'
      aria-label='tictactoe, home'
      className='group -m-1 flex rounded-sm p-1 font-display text-[22px] leading-none font-bold tracking-[-0.02em] sm:text-[28px]'>
      {'tictactoe'.split('').map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className={`inline-block transition-[color,transform] duration-300 group-hover:-translate-y-0.5 ${
            i % 2 ? 'group-hover:text-[#5aa9dc]' : 'group-hover:text-o-fill'
          }`}
          style={{ transitionDelay: `${i * 30}ms` }}>
          {ch}
        </span>
      ))}
    </Link>
  );
}

function UserName() {
  const { user, rename } = useUser();
  const notify = useToast();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const editBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (editing) input.current?.select();
  }, [editing]);

  if (!user) return null;

  const start = () => {
    setValue(user.userName);
    setError('');
    setEditing(true);
  };
  const stop = () => {
    setEditing(false);
    requestAnimationFrame(() => editBtn.current?.focus());
  };
  const save = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const name = value.trim();
    if (name === user.userName) return stop();
    if (!name || name.length > 20) {
      setError('Use 1 to 20 characters');
      return;
    }
    try {
      await rename(name);
      notify('Name saved', 'success');
      stop();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (editing) {
    return (
      <form onSubmit={save} className='flex min-w-0 items-center gap-1'>
        <label htmlFor='username' className='sr-only'>
          Your name
        </label>
        <input
          id='username'
          ref={input}
          value={value}
          maxLength={20}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Escape' && stop()}
          aria-invalid={!!error}
          aria-describedby={error ? 'username-error' : undefined}
          autoComplete='nickname'
          className='h-11 w-32 min-w-0 rounded-sm border border-glass-edge bg-well px-3 text-sm font-semibold text-ink placeholder:text-ink-muted sm:w-40'
        />
        {error && (
          <span id='username-error' role='alert' className='sr-only'>
            {error}
          </span>
        )}
        <IconButton label='Save name' type='submit'>
          <CheckIcon />
        </IconButton>
        <IconButton label='Cancel' onClick={stop} className='hidden sm:inline-flex'>
          <CloseIcon />
        </IconButton>
      </form>
    );
  }

  return (
    <div className='flex min-w-0 items-center'>
      <span className='mr-1 text-sm text-ink-muted sm:hidden'>Playing as</span>
      <span className='truncate text-sm font-semibold' title={user.userName}>
        {user.userName}
      </span>
      <IconButton ref={editBtn} label='Edit your name' onClick={start}>
        <EditIcon />
      </IconButton>
    </div>
  );
}

export default function Header() {
  const { theme, toggleTheme, effects, toggleEffects } = usePrefs();

  return (
    <header className='grid grid-cols-[1fr_auto] items-center gap-x-2 gap-y-1 sm:grid-cols-[auto_1fr_auto]'>
      <Logo />
      <div className='order-last col-span-2 flex min-w-0 sm:order-none sm:col-span-1 sm:justify-end'>
        <UserName />
      </div>
      <div className='flex items-center gap-0.5'>
        <IconButton
          label='Effects'
          aria-pressed={effects}
          onClick={toggleEffects}
          className={effects ? '' : 'text-ink-muted'}>
          <WavesIcon />
        </IconButton>
        <IconButton
          label={theme === 'night' ? 'Switch to day theme' : 'Switch to night theme'}
          onClick={toggleTheme}>
          {theme === 'night' ? <SunIcon /> : <MoonIcon />}
        </IconButton>
      </div>
    </header>
  );
}
