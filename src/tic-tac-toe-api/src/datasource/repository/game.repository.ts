import { IGameRepository } from './game.repository.interface';
import { Game } from '../../domain/model/game.model';
import { GameStorage } from '../storage/game.storage';
import { GameEntityMapper } from '../mapper/game.mapper';

export class GameRepositoryImpl implements IGameRepository {
  static save(gameDomain: Game) {
    throw new Error('Method not implemented.');
  }
  save(game: Game): void {
    const entity = GameEntityMapper.toEntity(game);
    GameStorage.getMap().set(entity.id, entity);
  }

  getById(id: string): Game | null {
    const entity = GameStorage.getMap().get(id);
    return entity ? GameEntityMapper.toDomain(entity) : null;
  }
}