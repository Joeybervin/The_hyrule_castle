import { IRoom } from "../interfaces/IRoom";
import { FightingRoom } from "./FightingRoom";
import { TrapRoom } from "./TrapRoom";
import { TreasureRoom } from "./TreasureRoom";

export class RoomFactory {

    static createRoom(type: string, roomInfos: IRoom ): TrapRoom | TreasureRoom | FightingRoom {
        switch (type) {
            case "fighting":
                return new FightingRoom(roomInfos);
            case "trap":
                return new TrapRoom(roomInfos);
            case 'treasure':
                return new TreasureRoom(roomInfos);
            default:
                throw new Error('Type de salle inconnu');
        }
    }
}