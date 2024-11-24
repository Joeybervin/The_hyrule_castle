import { CharacterData } from '../lib/gameData';
import { battle, getRandomItemFromFile } from '../lib/game.lib';
import { characterFactory } from '../classes/character/CharacterFactory';
import { displayBattleResult, displayBattleStart, displayGameIntroduction } from '../lib/display.lib';
import { enterGame } from '../main';
import { ICharacter } from '../interfaces/ICharacter';
import { Player } from '../classes/character/Player';
import { Boss } from '../classes/character/Boss';
import { Enemy } from '../classes/character/Enemy';
import { logCenteredText } from '../utils/utils';

const readlineSync = require('readline-sync');

export function startBaseGame(bossLevel : number, gameMode?: string) {

    let playerData: ICharacter = CharacterData.player
    if (gameMode === 'dynamic') {
        playerData = getRandomItemFromFile('/home/bervin_j/The_hyrule_castle/resources/players.json')
    }

    const player: Player | Enemy | Boss = characterFactory.createCharacterFromData('player', playerData);

    displayGameIntroduction(player);

    for (let floor = 1; floor <= bossLevel; floor++) {
        if (floor < bossLevel) {

            let enemyData: ICharacter = CharacterData.enemy
            if (gameMode === 'dynamic') {
                enemyData = getRandomItemFromFile('/home/bervin_j/The_hyrule_castle/resources/enemies.json')
            }

            const enemy: Player | Enemy | Boss = characterFactory.createCharacterFromData('enemy', enemyData);
            displayBattleStart(floor, enemy.name);
            let battleResult: string = battle((player as Player), enemy, ['Attaquer ⚔️', 'Soigner ⛑️']);
            displayBattleResult(battleResult === 'winner' ? true : false, false);
            if (battleResult === 'looser') {
                break;
            }
        } else {
            let bossData: ICharacter = CharacterData.boss
            if (gameMode === 'Dynamic') {
                bossData = getRandomItemFromFile('/home/bervin_j/The_hyrule_castle/resources/bosses.json')
            }

            const boss: Player | Enemy | Boss = characterFactory.createCharacterFromData('boss', bossData);
            displayBattleStart(floor, boss.name);
            let battleResult: string = battle((player as Player), boss, ['Attaquer ⚔️', 'Soigner ⛑️']);
            displayBattleResult(battleResult === 'winner' ? true : false, true);

            
        }
    }
    readlineSync.keyIn(logCenteredText('\x1b[5;90m Appuyez sur n\'importe quelle touche pour retourner au menu principal \x1b[0m', '='));
    enterGame();
}
