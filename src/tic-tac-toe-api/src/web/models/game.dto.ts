export interface GameDTOReq {
    board: number[][]
}
export interface GameDTORes {
    id: string;
    board: number[][];
    status: 'win' | 'lose' | 'draw' | 'continue';
}