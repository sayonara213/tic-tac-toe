import { CellEntity, CellType } from '../cell/CellEntity';

export class FieldEntity {
  public cells: CellEntity[] = [];

  constructor(cells: CellEntity[]) {
    this.cells = cells;
  }

  setCellType(id: number, type: CellType) {
    this.cells[id].type = type;
  }
}
