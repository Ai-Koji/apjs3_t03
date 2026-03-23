import { GameEntity } from '../models/game.entity';

export class GameStorage {
  private static instance: Map<string, GameEntity> = new Map();

  static getMap() {
    return this.instance;
  }
}