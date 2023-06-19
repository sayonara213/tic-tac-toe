import { FieldEntity, TMove } from '../field/FieldEntity';

export type TGameMode = 'single' | 'multiplayer';

export class GameEntity {
  public field: FieldEntity;
  public gameMode: TGameMode;
  public playerMove: TMove;

  constructor(field: FieldEntity, gameMode: TGameMode, playerMove: TMove) {
    this.field = field;
    this.gameMode = gameMode;
    this.playerMove = playerMove;
  }
}
