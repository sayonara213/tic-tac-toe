import { FieldEntity, TMove } from '../field/FieldEntity';

export type TGameMode = 'single' | 'multiplayer';

export class GameEntity {
  public id: string;
  public field: FieldEntity;
  public gameMode: TGameMode;
  public playerOne: TMove = 'circle';
  public playerTwo: TMove = 'cross';

  constructor(id: string, field: FieldEntity, gameMode: TGameMode) {
    this.id = id;
    this.field = field;
    this.gameMode = gameMode;
  }
}
