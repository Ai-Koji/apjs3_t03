import {Board} from './board.entity';

export class GameEntity {
  id: string; // UUID
  board: string; // JSON формат
  constructor (board: string, id: string) {
    this.id = id;
    this.board = board;
  }
}