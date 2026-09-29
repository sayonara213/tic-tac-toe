import 'server-only';
import { randomBytes } from 'node:crypto';
import { emptyBoard, other, outcome, place, randomMark, isValidCell } from '../game';
import type { GameSummary, GameView, HistoryEntry, PlayerView } from '../types';
import { HttpError } from './auth';
import { publishGame } from './events';
import { db, type GameRecord, type UserRecord } from './store';

type Users = Record<string, UserRecord>;

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const newGameId = () =>
  Array.from(randomBytes(20), (b) => ALPHABET[b % ALPHABET.length]).join('');

const nameOf = (users: Users, uid: string) => (uid ? (users[uid]?.userName ?? 'Unknown') : '');

function players(game: GameRecord, users: Users) {
  return game.players.map((p) => ({ ...p, userName: nameOf(users, p.uid) })) as [
    PlayerView,
    PlayerView,
  ];
}

function toView(game: GameRecord, users: Users): GameView {
  return {
    id: game.id,
    players: players(game, users),
    board: game.board,
    nextMove: game.nextMove,
    isWin: game.isWin,
    date: game.date,
    version: game.version,
  };
}

function getOr404(games: Record<string, GameRecord>, id: string) {
  const game = Object.hasOwn(games, id) ? games[id] : undefined;
  if (!game) throw new HttpError(404, 'Game not found');
  return game;
}

export async function createGame(uid: string): Promise<GameView> {
  const move = randomMark();
  const game: GameRecord = {
    id: newGameId(),
    players: [
      { uid, move, winCount: 0 },
      { uid: '', move: other(move), winCount: 0 },
    ],
    board: emptyBoard(),
    nextMove: 'circle',
    isWin: false,
    date: new Date().toISOString(),
    history: [],
    version: 1,
  };
  return db.write(({ games, users }) => {
    games[game.id] = game;
    return toView(game, users);
  });
}

export async function getGame(id: string): Promise<GameView> {
  return db.read(({ games, users }) => toView(getOr404(games, id), users));
}

export async function listGamesFor(uid: string): Promise<GameSummary[]> {
  return db.read(({ games, users }) =>
    Object.values(games)
      .filter((g) => g.players.some((p) => p.uid === uid))
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((g) => ({ id: g.id, players: players(g, users), board: g.board, date: g.date })),
  );
}

export async function getHistory(id: string): Promise<HistoryEntry[]> {
  return db.read(({ games, users }) =>
    getOr404(games, id)
      .history.slice()
      .reverse()
      .map((h) => ({ ...h, winnerName: nameOf(users, h.winner) })),
  );
}

async function mutate(id: string, fn: (game: GameRecord) => boolean) {
  const view = await db.write(({ games, users }) => {
    const game = getOr404(games, id);
    const changed = fn(game);
    if (changed) game.version += 1;
    return { view: toView(game, users), changed };
  });
  if (view.changed) publishGame(id);
  return view.view;
}

/** Takes the open seat, as the old lobby did on first visit. Spectators are left as is. */
export function joinGame(id: string, uid: string) {
  return mutate(id, (game) => {
    const [host, guest] = game.players;
    if (guest.uid !== '' || host.uid === uid) return false;
    guest.uid = uid;
    return true;
  });
}

export function makeMove(id: string, uid: string, cell: unknown) {
  if (!isValidCell(cell)) throw new HttpError(400, 'Cell must be 0-8');
  return mutate(id, (game) => {
    const player = game.players.find((p) => p.uid === uid);
    if (!player) throw new HttpError(403, 'You are watching this game');
    if (player.move !== game.nextMove) throw new HttpError(409, 'Not your turn');
    const board = place(game.board, cell, player.move);
    if (!board) throw new HttpError(409, 'That cell is taken');

    game.board = board;
    game.nextMove = other(player.move);
    const result = outcome(board);
    if (result && result.winner !== 'draw') {
      player.winCount += 1;
      game.isWin = true;
      game.history.push({ move: player.move, winner: uid, timestamp: new Date().toISOString() });
    }
    return true;
  });
}

/** Allowed once the round is over. Seats swap marks at random; scores carry over. */
export function restartGame(id: string, uid: string) {
  return mutate(id, (game) => {
    if (!game.players.some((p) => p.uid === uid)) {
      throw new HttpError(403, 'Only players can restart');
    }
    if (!outcome(game.board)) throw new HttpError(409, 'The round is still going');
    const move = randomMark();
    game.players[0].move = move;
    game.players[1].move = other(move);
    game.board = emptyBoard();
    game.nextMove = 'circle';
    game.isWin = false;
    return true;
  });
}

export async function renameUser(uid: string, raw: unknown) {
  const userName = typeof raw === 'string' ? raw.trim() : '';
  if (!userName || userName.length > 20) {
    throw new HttpError(400, 'Name must be 1 to 20 characters');
  }
  const gameIds = await db.write(({ users, games }) => {
    users[uid].userName = userName;
    return Object.values(games)
      .filter((g) => g.players.some((p) => p.uid === uid))
      .map((g) => g.id);
  });
  // Open lobbies show names, so let them refresh.
  gameIds.forEach(publishGame);
  return { uid, userName };
}
