"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrapRoom = void 0;
const random_game_event_1 = require("../../mods/intermediate/random_game_event");
const utils_1 = require("../../utils/utils");
const Room_1 = require("./Room");
class TrapRoom extends Room_1.Room {
    constructor(roomInfos, id, name, requirement, stat = '', rarity) {
        super(roomInfos);
        this.id = id;
        this.name = name;
        this.requirement = requirement;
        this.stat = stat !== null && stat !== void 0 ? stat : '';
        this.rarity = rarity;
    }
    enter(player) {
        const trapRoomInfos = (0, random_game_event_1.getRoomRequirement)();
        this.roomDescription();
        (0, utils_1.logCenteredText)(`Pour traverser la ${trapRoomInfos.name} cette room en toute sécurité il te faut :`, ' ', false);
        (0, utils_1.logCenteredText)(`un ${trapRoomInfos.requirement} supérieur ou égal à ${trapRoomInfos.stat}`, ' ', false);
        (0, utils_1.logCenteredText)('Avez vous ce qu\'il faut pour passer à la room suivante sans dommage ?', ' ');
        // appui sur touch
        (0, random_game_event_1.isPlayerMeetRequirements)(player, trapRoomInfos);
        this.quitRoom();
    }
}
exports.TrapRoom = TrapRoom;
