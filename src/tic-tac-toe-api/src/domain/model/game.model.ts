import { v4 as uuidv4 } from "uuid";

// 0 - пусто, 1 - крестик, 2 - нолик
export type Board = number[][];

export class Game {
    id: string;
    board: Board;

    constructor(board: Board, id: string) {
        this.id = id || uuidv4()
        
        this.board = board || [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]
    }
}