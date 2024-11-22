import { Boss } from "../../classes/character/Boss";
import { Character } from "../../classes/character/Character";
import { Enemy } from "../../classes/character/Enemy";
import { Player } from "../../classes/character/Player";

export function initStatsPlus(target: Player | Enemy | Boss): boolean {
    return target.statsPlus = true;
}
