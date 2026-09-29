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

The dataset lives in memory on one Node server and every change is saved:

- **`DATABASE_URL` set**: to Postgres, one JSONB row per user and game in a `ttt_records` table (created on first start).
- **Otherwise**: to `.data/db.json` (or `$DATA_DIR/db.json`). Good for local development.

Live updates use an in-process event bus, so run a single instance. To scale out, move `src/lib/server/store.ts` and `events.ts` to a shared store such as Postgres + Redis.

## Deploying to Render (free tier)

1. In Render, choose **New → Blueprint** and pick this repository. `render.yaml` creates a free Node web service.
2. When asked for `DATABASE_URL`, paste a Postgres connection string. Free web services on Render lose their disk on every restart, so without one, games disappear whenever the service sleeps.
   - [Neon](https://neon.tech)'s free plan works and doesn't expire. Use its pooled connection string, which ends in `?sslmode=require`.
   - Render's own free Postgres works too, but it expires 30 days after creation.
3. Deploy. Free services sleep after 15 minutes without visitors, and the first visit after that takes about a minute while the service wakes up. Open lobbies reconnect on their own.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # game rules
npm run lint     # type check
```
