import { IGameRepository } from './game.repository.interface';
import { Game } from '../../domain/model/game.model';
import { GameStorage } from '../storage/game.storage';
import { GameMapper } from '../mapper/game.mapper';

export class GameRepositoryImpl implements IGameRepository {
  save(game: Game): void {
    const entity = GameMapper.toEntity(game);
    GameStorage.getMap().set(entity.id, entity);
  }

  getById(id: string): Game | null {
    const entity = GameStorage.getMap().get(id);
    return entity ? GameMapper.toDomain(entity) : null;
  }
}