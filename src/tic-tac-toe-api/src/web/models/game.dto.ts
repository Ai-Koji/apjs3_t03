export interface GameDTORes {
    id: string | null;
    board: number[][];
    status: 'win' | 'lose' | 'draw' | 'continue';
}