# TicTacToe Game

Simple online TicTacToe game that you can play online or on a single device.

## Features

### Online game mode

Create a lobby and share the ID or link with a friend. The first visitor takes the open seat, anyone after that watches. In the lobby you can track your score and see the history of won rounds. Moves, joins, restarts and name changes show up live for everyone in the lobby.

### Single player mode

Two players take turns on one device.

### Look and feel

The UI follows the **Lagoon** styleguide: one frosted glass console on a night (or day) sea, Unbounded + Manrope type, O on sea-glass tiles, X on deep channel tiles, and a pearl glow on the winning line. PixiJS draws the drifting aurora, bubbles that part around your pointer, ripples where a mark lands and a spray along the winning line. The waves button in the header turns effects off; they are also off when your OS asks for reduced motion.

### Accessibility

- The board is nine real buttons. Arrow keys move between cells, Enter or Space places a mark, and each cell announces its row, column and contents.
- Moves, joins, results and new rounds are announced through a live region.
- Every control has a visible focus ring and a 44px touch target. Text meets WCAG AA contrast in both themes, and O and X differ in shape and lightness, not colour alone.
- Works from a 320px wide phone up, with safe-area insets respected.

## Tech

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS 4 with the Lagoon tokens in `src/app/globals.css`
- PixiJS 8 for effects (`src/components/effects/`), loaded on the client only
- Built-in API routes replace Firebase (see below)

## API

All routes live under `src/app/api`. Accounts are anonymous, as before: the first request creates `User xxxxx` and sets an httpOnly session cookie.

| Method | Route | What it does |
| --- | --- | --- |
| POST | `/api/session` | Sign in, creating an anonymous user on first visit |
| GET / PATCH | `/api/me` | Read or rename the current user (1–20 chars) |
| GET | `/api/games` | Games you play in, newest first |
| POST | `/api/games` | Create a game (your mark is picked at random) |
| GET | `/api/games/:id` | Game state |
| POST | `/api/games/:id/join` | Take the open seat, if any |
| POST | `/api/games/:id/move` | `{ "cell": 0-8 }`, checked on the server |
| POST | `/api/games/:id/restart` | New round once the current one is over |
| GET | `/api/games/:id/history` | Won rounds, newest first |
| GET | `/api/games/:id/events` | Server-Sent Events stream of game state |

The rules run on the server (`src/lib/game.ts`), so a player can't move out of turn, overwrite a cell or bump their own score.

### Storage

Data is kept in a JSON file (`.data/db.json`, or `$DATA_DIR/db.json`), loaded into memory and written atomically on every change. Live updates use an in-process event bus. That fits one long-running Node server (`npm run build && npm start`, a VPS, Fly.io, Render, Railway, Docker). Serverless hosts such as Netlify or Vercel functions don't keep files or share memory between instances; for those, swap `src/lib/server/store.ts` and `events.ts` for Postgres/Redis. Nothing else touches storage.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # game rules
npm run lint     # type check
```
