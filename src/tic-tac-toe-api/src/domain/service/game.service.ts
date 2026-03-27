import {IGameService} from './game.service.interface'
import {Game} from '../model/game.model'
import { IGameRepository } from '../../datasource/repository/game.repository.interface';
import { Injectable } from '@nestjs/common';

// @Injectable()
export class GameService implements IGameService  {
    private _repository: IGameRepository;
    constructor(repository: IGameRepository) {
        this._repository = repository;
    }

    getNextMove(game: Game): { x: number, y: number } {
        let bestScore = -Infinity;
        let move = { x: -1, y: -1 };

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (game.board[i][j] === 0) {
                    game.board[i][j] = 1;
                    let score = this.minimax(game, 0, false);
                    game.board[i][j] = 0; // Отменяем ход

                    // выбираем лучший ход
                    if (score > bestScore) {
                        bestScore = score;
                        move = { x: i, y: j };
                    }
                }
            }
        }
        return move;
    }
    private minimax(game: Game, depth: number, isMaximizing: boolean): number {
        const result = this.isEnd(game);
        
        // если игра окончилась - вычисляем оценку и выходим
        if (result === 1) return 10 - depth;  // Выиграл компьютер (быстрее = лучше)
        if (result === 2) return depth - 10;  // Выиграл человек (дольше = лучше для нас)
        if (result === 3) return 0;           // Ничья

        if (isMaximizing) {
            let bestScore = -Infinity;
            
            // ищем все возможные ходы и рекурсивно запускаем minimax
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (game.board[i][j] === 0) {
                        game.board[i][j] = 1; 
                        let score = this.minimax(game, depth + 1, false);
                        game.board[i][j] = 0;
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;

            // тоже самое, но для минимизации
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (game.board[i][j] === 0) {
                        game.board[i][j] = 2; 
                        let score = this.minimax(game, depth + 1, true);
                        game.board[i][j] = 0;
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }
    validateBoard(game: Game) {
        let count1 = game.board.flat().filter(el => el === 1).length
        let count2 = game.board.flat().filter(el => el === 2).length
        if (
            Math.abs(count1 - count2) > 1 
            || 
            count2 >= count1
        )
            return false;
        return true;
    }

    validateNewBoard(origin: Game, newGame: Game): boolean {
        let newOne = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (origin.board[i][j] !== newGame.board[i][j] && origin.board[i][j] !== 0)
                    return false;
                else if (origin.board[i][j] === 0 && newGame.board[i][j] === 2)
                    return false;
                else if (origin.board[i][j] === 0 && newGame.board[i][j] === 1)
                    newOne++;
            }
        }

        if (newOne > 1)
            return false;
        return true;
    } 

    validate(game: Game, move: {x: number, y: number}): boolean {
        if (
            move.y === undefined || 
            move.x === undefined ||
            game.board[move.x][move.y] !== 0 ||
            move.x > 3 || move.y > 3 ||
            move.x < 0 || move.y < 0
        )
            return false;
        return true;
    }
    /** определяет статус игры
     * @param game -игра
     * @returns {number} 3 - ничья, -1 - игра продолжается, 1 - крестик победил, 2 - нолик победил
     */
    isEnd(game: Game): number {
        let board = game.board;

        let isPeace = true;

        for (let i = 0; i < 3; i++) {
            if (board[i][0] == board[i][1] && board[i][0] == board[i][2])
                return board[i][0];

            if (board[0][i] == board[1][i] && board[0][i] == board[2][i])
                return board[0][i];           
            
            if (board.find(el => el[i] == 0))
                isPeace = false;
        }

        if (isPeace)
            return 3;

        if (board[0][0] == board[1][1] && board[0][0] == board[2][2])
            return board[0][0];
        return 0;
    }
}