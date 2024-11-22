"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FightingRoom = void 0;
const Room_1 = require("./Room");
class FightingRoom extends Room_1.Room {
    enter() {
        console.log('Vous êtes entré dans une room de combat');
    }
}
exports.FightingRoom = FightingRoom;
