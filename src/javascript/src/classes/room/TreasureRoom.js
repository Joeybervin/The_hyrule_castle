"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreasureRoom = void 0;
const utils_1 = require("../../utils/utils");
const Room_1 = require("./Room");
class TreasureRoom extends Room_1.Room {
    enter(player) {
        this.roomDescription();
        const randomCoins = (0, utils_1.getRandomNumberRange)(3, 5);
        (0, utils_1.logCenteredText)(`Tu as gagné +\x1b[32;1m${randomCoins}\x1b[0m coins\n`, ' ');
        player.coins += randomCoins;
        this.quitRoom();
    }
}
exports.TreasureRoom = TreasureRoom;
