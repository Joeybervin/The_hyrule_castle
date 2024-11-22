"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateRandomRoomEvent = activateRandomRoomEvent;
exports.isPlayerMeetRequirements = isPlayerMeetRequirements;
exports.getRoomRequirement = getRoomRequirement;
exports.randomRoomEvent = randomRoomEvent;
exports.playerEnterRoom = playerEnterRoom;
const RoomFactory_1 = require("../classes/room/RoomFactory");
const game_lib_1 = require("../lib/game.lib");
const utils_1 = require("../utils/utils");
function activateRandomRoomEvent(gameStates) {
    gameStates.randomRoomEvent = true;
}
function getRandomRoomType() {
    let room;
    let roomInfos = {
        type: 'fighting'
    };
    const randomNumber = (0, utils_1.getRandomNumberRange)(1, 2);
    const roomType = randomNumber === 1 ? 'trap' : 'treasure';
    roomInfos.type = roomType;
    randomNumber === 1 ? room = RoomFactory_1.RoomFactory.createRoom(roomType, roomInfos) : room = RoomFactory_1.RoomFactory.createRoom(roomType, roomInfos);
    return room;
}
function calculateTrapRoomDamage(player) {
    const damagePourcentage = (0, utils_1.getRandomNumberRange)(5, 15);
    const damage = (damagePourcentage / 100) * player.maxHP;
    return damage;
}
function isPlayerMeetRequirements(player, trapRoomRequiment) {
    const getRandomDamage = calculateTrapRoomDamage(player);
    if (player[trapRoomRequiment.stat] >= parseInt(trapRoomRequiment.requirement)) {
        console.log('Félicitations tu regroupe les conditions requises afin de ne subir aucun dommage');
        console.log('N\'abandonne pas aventurier ! Le village compte sur toi');
        console.log('récompense : +1 coins');
        player.coins += 1;
    }
    console.log('Malheureusement tu ne regroupes pas les conditions requises pour passer cette room sans dommages en la quittant');
    console.group(`En quittant cette room tu perdras ${getRandomDamage} hp`);
    player[trapRoomRequiment.stat] -= getRandomDamage;
}
function getRoomRequirement() {
    const TrapRoomData = (0, game_lib_1.getRandomItemFromFile)('../../resources/traps.json');
    let getRandomTrapRoom = (0, game_lib_1.getRandomItem)(TrapRoomData);
    const rawRequirement = getRandomTrapRoom.requirement.toLowerCase();
    getRandomTrapRoom.requirement = rawRequirement.split('_')[1];
    getRandomTrapRoom.stat = rawRequirement.split('_')[0];
    return getRandomTrapRoom;
}
function randomRoomEvent(gameStates, enemyType, battleResult) {
    let missingRoomMessage = '';
    if (gameStates === true && battleResult === 'winner') {
        let roomEventChance;
        enemyType === 'boss' ? roomEventChance = 100 : roomEventChance = 35;
        const randomNumber = (0, utils_1.getRandomNumberRange)(1, 100);
        if (randomNumber <= roomEventChance) {
            return getRandomRoomType();
        }
        else {
            const roomType = getRandomRoomType().type;
            roomType === 'trap' ? missingRoomMessage = `Grâce à ta vitesse et à ta dextérité tu échappes à une ${roomType} room` : missingRoomMessage = `Oooohla ! Doucement aventurier tu viens de passé devant une ${roomType} room`;
        }
    }
    return missingRoomMessage;
}
function playerEnterRoom() {
}
