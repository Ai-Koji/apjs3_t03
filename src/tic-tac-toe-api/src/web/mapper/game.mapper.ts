import {Game} from "../../domain/model/game.model";
import {GameDTORes} from "../models/game.dto";

export class GameMapper {
    static toDto(game: Game, status: number): GameDTORes {
        return {
            id: game.id,
            board: game.board,
            status: 
                (status) === 1 ? 'win' :
                (status) === 2 ? 'lose' :
                (status) === 3 ? 'draw' :
                'continue',
        };
    }
}