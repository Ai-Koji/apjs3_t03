import { GameEntity } from '../models/game.entity';
import { Game } from '../../domain/model/game.model';

export class GameMapper {
    static toDomain(entity: GameEntity): Game {
        let boardList = JSON.parse(entity.board); 
        return new Game(
            boardList,
            entity.id
        );
    }
    static toEntity(domain: Game): GameEntity {
        return new GameEntity(
            JSON.stringify(domain.board),
            domain.id
        )
    }
}