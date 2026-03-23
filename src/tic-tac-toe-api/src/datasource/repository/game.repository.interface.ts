import { Game } from '../../domain/model/game.model';

export interface IGameRepository {
  save(game: Game): void;
  getById(id: string): Game | null;
}