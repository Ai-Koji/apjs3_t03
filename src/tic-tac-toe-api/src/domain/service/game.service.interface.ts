import {Game} from '../model/game.model';

export interface IGameService {
    /** Вычисление следующего хода методом minmax
     *  минмакс - взгляд в будущее, он перечисляет все возможные варианты и ищет оптимальный
     * @param game игровое поле
     * @returns следующий ход
     */
    getNextMove(game: Game): {x: number, y: number};
    /** Проверка валидности игры
     * @param game игровое поле
     * @param move ход, x - номер столбца, y - номер строки, начинаются с 0
     * @returns true если игра валидна
     */
    validate(game: Game, move: {x: number, y: number}): boolean;
    /** Проверка окончания игры
     * @param game игровое поле
     * @returns 1 - крестик победил, 2 - нолик победил, -1 - игра продолжается, 3 - ничья
     */
    isEnd(game: Game): number;
}