import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emptyBoard, outcome, place, type Board } from './game.ts';

const b = (s: string): Board =>
  s.split('').map((c) => (c === 'o' ? 'circle' : c === 'x' ? 'cross' : 'empty'));

test('empty board has no outcome', () => {
  assert.equal(outcome(emptyBoard()), null);
});

test('detects rows, columns and diagonals', () => {
  assert.deepEqual(outcome(b('ooo......')), { winner: 'circle', line: [0, 1, 2] });
  assert.deepEqual(outcome(b('x..x..x..')), { winner: 'cross', line: [0, 3, 6] });
  assert.deepEqual(outcome(b('..o.o.o..')), { winner: 'circle', line: [2, 4, 6] });
});

test('a winning move that fills the board is a win, not a draw', () => {
  assert.deepEqual(outcome(b('xoxooxxxo')), { winner: 'draw', line: [] });
  assert.deepEqual(outcome(b('oxoxoxxoo')), { winner: 'circle', line: [0, 4, 8] });
});

test('place rejects occupied cells, bad indexes and finished games', () => {
  assert.equal(place(b('o........'), 0, 'cross'), null);
  assert.equal(place(emptyBoard(), 9, 'cross'), null);
  assert.equal(place(emptyBoard(), 1.5, 'cross'), null);
  assert.equal(place(b('ooo......'), 5, 'cross'), null);
  assert.deepEqual(place(emptyBoard(), 4, 'cross'), b('....x....'));
});
