import { CellEntity, CellType } from '../cell/CellEntity';

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export type TMove = 'circle' | 'cross';
export type TWon = CellType | 'draw';

export class FieldEntity {
  public cells: CellEntity[] = [];
  public move: TMove = 'circle';
  public won: TWon = 'empty';

  setCellType(id: number, type: CellType) {
    this.cells[id].type = type;
  }

  initField() {
    for (let i = 0; i < 9; i++) {
      this.cells.push(new CellEntity(i, 'empty'));
    }
  }

  setField(field: FieldEntity) {
    this.cells = field.cells;
    return this;
  }

  setMove(move: TMove) {
    this.move = move;
  }

  checkWin() {
    if (this.cells.every((cell) => cell.type !== 'empty')) {
      this.won = 'draw';
      return 'draw';
    }

    for (let i = 0; i < winCombinations.length; i++) {
      const [a, b, c] = winCombinations[i];
      if (
        this.cells[a].type !== 'empty' &&
        this.cells[a].type === this.cells[b].type &&
        this.cells[a].type === this.cells[c].type
      ) {
        this.won = this.cells[a].type;
        return this.cells[a].type;
      }
    }
    return false;
  }
}
