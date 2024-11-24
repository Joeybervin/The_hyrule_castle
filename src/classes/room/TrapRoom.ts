import { getRandomItem, getRandomItemFromFile } from "../../lib/game.lib";
import { getRoomRequirement, isPlayerMeetRequirements } from "../../mods/intermediate/random_game_event";
import { logCenteredText } from "../../utils/utils";
import { Player } from "../character/Player";
import { IRoom } from "../../interfaces/IRoom";
import { Room } from "./Room";

export class TrapRoom extends Room {

    id: number | undefined;
    name: string | undefined;
    stat: string | undefined;
    requirement: string | undefined;
    rarity: number | undefined;

    constructor(roomInfos: IRoom, id?: number, name?: string, requirement?: string, stat: string = '',  rarity?: number){
        super(roomInfos)
        this.id = id ;
        this.name = name;
        this.requirement = requirement;
        this.stat = stat ?? '';
        this.rarity = rarity;
    }
    
    enter(player: Player): void {
        const trapRoomInfos: TrapRoom = getRoomRequirement();
        this.roomDescription()
        logCenteredText(`Pour traverser la ${trapRoomInfos.name} cette room en toute sécurité il te faut :`, ' ', false);
        logCenteredText(`un ${trapRoomInfos.requirement} supérieur ou égal à ${trapRoomInfos.stat}`, ' ', false);
        logCenteredText('Avez vous ce qu\'il faut pour passer à la room suivante sans dommage ?', ' ');
        // appui sur touch
        isPlayerMeetRequirements(player, trapRoomInfos)
        this.quitRoom();
    }
}