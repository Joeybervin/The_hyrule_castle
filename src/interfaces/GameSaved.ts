import { Boss } from "../classes/character/Boss";
import { Enemy } from "../classes/character/Enemy";
import { Player } from "../classes/character/Player"
import { GameStates } from "./GameStates";

export interface GameSaved {
    player: Player | Enemy | Boss;
    gameStates: GameStates;
    lastLevelPlayed: number
}