import { Player } from "../../classes/character/Player";
import { IRoom } from "../../classes/interfaces/IRoom";
import { RoomFactory } from "../../classes/room/RoomFactory";
import { TrapRoom } from "../../classes/room/TrapRoom";
import { TreasureRoom } from "../../classes/room/TreasureRoom";
import { GameStates } from "../../interfaces/GameStates";
import { getRandomItem, getRandomItemFromFile } from "../../lib/game.lib";
import { getRandomNumberRange, logCenteredText } from "../../utils/utils";


export function activateRandomRoomEvent(gameStates: Partial<GameStates> ) {
    gameStates.randomRoomEvent = true;
}

function getRandomRoomType(): TrapRoom | TreasureRoom {
    let room: TrapRoom | TreasureRoom;
    let roomInfos: IRoom = {
        type: 'fighting'
    }
    const randomNumber = getRandomNumberRange(1,2);
    const roomType = randomNumber === 1 ? 'trap' : 'treasure';
    roomInfos.type = roomType
    randomNumber === 1 ? room = RoomFactory.createRoom(roomType, roomInfos) : room = RoomFactory.createRoom(roomType, roomInfos);
    return room
}

function calculateTrapRoomDamage(player: Player): number {
    const damagePourcentage: number = getRandomNumberRange(5,15);
    const damage: number = (damagePourcentage / 100) * player.maxHP
    return damage;
}

export function isPlayerMeetRequirements(player: Player, trapRoomRequiment : TrapRoom): void {

    const getRandomDamage: number = calculateTrapRoomDamage(player);

    if (player[trapRoomRequiment.stat as keyof typeof player] as number >= parseInt(trapRoomRequiment.requirement!)) {
        logCenteredText('Félicitations tu regroupe les conditions requises afin de ne subir aucun dommage', ' ');
        logCenteredText('N\'abandonne pas aventurier ! Le village compte sur toi', ' ')
        logCenteredText('récompense : +1 coins', ' ')
        player.coins += 1;
    }
    logCenteredText('Malheureusement tu ne regroupes pas les conditions requises pour passer cette room sans dommages en la quittant', ' ');
    logCenteredText(`En quittant cette room tu perdras ${getRandomDamage} hp` , ' ');
    (player[trapRoomRequiment.stat as keyof typeof player] as number) -= getRandomDamage;
}


export function getRoomRequirement(): TrapRoom {
    const TrapRoomData: TrapRoom[] = getRandomItemFromFile('../../resources/traps.json');
    let getRandomTrapRoom: TrapRoom = getRandomItem(TrapRoomData);
    const rawRequirement: string = getRandomTrapRoom.requirement!.toLowerCase();
    getRandomTrapRoom.requirement = rawRequirement.split('_')[1];
    getRandomTrapRoom.stat = rawRequirement.split('_')[0];
    return getRandomTrapRoom
}

export function randomRoomEvent(gameStates: boolean, enemyType: string, battleResult: string): TrapRoom | TreasureRoom | string  {
    let missingRoomMessage: string = '';
    if (gameStates === true && battleResult === 'winner') {
        let roomEventChance: number;
        enemyType === 'boss' ? roomEventChance = 100 : roomEventChance = 35;
        const randomNumber = getRandomNumberRange(1,100)
        if (randomNumber <= roomEventChance) {
            return getRandomRoomType();
        }
        else {
            const roomType: string = getRandomRoomType().type;
            roomType === 'trap' ? missingRoomMessage=`Grâce à ta vitesse et à ta dextérité tu échappes à une ${roomType} room` : missingRoomMessage=`Oooohla ! Doucement aventurier tu viens de passé devant une ${roomType} room`;
            
        }
    }
    return missingRoomMessage;
}

export function playerEnterRoom() {

}