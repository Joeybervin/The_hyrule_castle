"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomFactory = void 0;
const FightingRoom_1 = require("./FightingRoom");
const TrapRoom_1 = require("./TrapRoom");
const TreasureRoom_1 = require("./TreasureRoom");
class RoomFactory {
    static createRoom(type, roomInfos) {
        switch (type) {
            case "fighting":
                return new FightingRoom_1.FightingRoom(roomInfos);
            case "trap":
                return new TrapRoom_1.TrapRoom(roomInfos);
            case 'treasure':
                return new TreasureRoom_1.TreasureRoom(roomInfos);
            default:
                throw new Error('Type de salle inconnu');
        }
    }
}
exports.RoomFactory = RoomFactory;
