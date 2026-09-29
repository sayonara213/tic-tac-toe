// Pure game rules, shared by the API (authoritative) and the single-player screen.

export type Mark = 'circle' | 'cross';
export type CellValue = Mark | 'empty';
export type Board = CellValue[];
export type Outcome = { winner: Mark; line: number[] } | { winner: 'draw'; line: [] } | null;

export const LINES: readonly number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const emptyBoard = (): Board => Array.from({ length: 9 }, () => 'empty');

export const other = (mark: Mark): Mark => (mark === 'circle' ? 'cross' : 'circle');

export const randomMark = (): Mark => (Math.random() < 0.5 ? 'cross' : 'circle');

/** Lines are checked before fullness, so a winning last move is a win, not a draw. */
export function outcome(board: Board): Outcome {
  for (const line of LINES) {
    const [a, b, c] = line;
    const v = board[a];
    if (v !== 'empty' && v === board[b] && v === board[c]) {
      return { winner: v, line: [...line] };
    }
  }
  if (board.every((v) => v !== 'empty')) return { winner: 'draw', line: [] };
  return null;
}

export function isValidCell(cell: unknown): cell is number {
  return typeof cell === 'number' && Number.isInteger(cell) && cell >= 0 && cell < 9;
}

/** Returns the new board, or null when the move is not allowed. */
export function place(board: Board, cell: number, mark: Mark): Board | null {
  if (!isValidCell(cell) || board[cell] !== 'empty' || outcome(board)) return null;
  const next = board.slice();
  next[cell] = mark;
  return next;
}

export const cellName = (i: number) => `row ${Math.floor(i / 3) + 1}, column ${(i % 3) + 1}`;

export const markName = (m: CellValue) => (m === 'empty' ? 'empty' : m === 'circle' ? 'O' : 'X');
