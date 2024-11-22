import { getRandomNumberRange, logCenteredText } from "../../utils/utils";
import { Player } from "../character/Player";
import { Room } from "./Room";

export class TreasureRoom extends Room {
    
    enter(player: Player) {
        this.roomDescription();
        const randomCoins: number = getRandomNumberRange(3,5);
        logCenteredText(`Tu as gagné +\x1b[32;1m${randomCoins}\x1b[0m coins\n`, ' ');
        player.coins += randomCoins;
        this.quitRoom();
    }
}