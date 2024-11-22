export interface GameStates {
    difficulty: string;
    enemyBoost: number;
    gameMode: string;
    roomLevel: number;
    gamePlayerStatsPlus: boolean;
    randomExp: boolean;
    randomRoomEvent: boolean;
}

export type GameStatesDifficulty = Pick<GameStates, "difficulty" | "enemyBoost">;