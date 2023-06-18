export type CellType = 'empty' | 'circle' | 'cross';

export class CellEntity {
  public id: number;
  public type: CellType;

  constructor(id: number, type: CellType) {
    this.id = id;
    this.type = type;
  }
}
