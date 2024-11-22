"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startBaseGame = startBaseGame;
const gameData_1 = require("../lib/gameData");
const game_lib_1 = require("../lib/game.lib");
const CharacterFactory_1 = require("../classes/character/CharacterFactory");
const display_lib_1 = require("../lib/display.lib");
const main_1 = require("../../main");
const utils_1 = require("../utils/utils");
const readlineSync = require('readline-sync');
function startBaseGame(bossLevel, gameMode) {
    let playerData = gameData_1.CharacterData.player;
    if (gameMode === 'dynamic') {
        playerData = (0, game_lib_1.getRandomItemFromFile)('/home/bervin_j/The_hyrule_castle/resources/players.json');
    }
    const player = CharacterFactory_1.characterFactory.createCharacterFromData('player', playerData);
    (0, display_lib_1.displayGameIntroduction)(player);
    for (let floor = 1; floor <= bossLevel; floor++) {
        if (floor < bossLevel) {
            let enemyData = gameData_1.CharacterData.enemy;
            if (gameMode === 'dynamic') {
                enemyData = (0, game_lib_1.getRandomItemFromFile)('/home/bervin_j/The_hyrule_castle/resources/enemies.json');
            }
            const enemy = CharacterFactory_1.characterFactory.createCharacterFromData('enemy', enemyData);
            (0, display_lib_1.displayBattleStart)(floor, enemy.name);
            let battleResult = (0, game_lib_1.battle)(player, enemy, ['Attaquer ⚔️', 'Soigner ⛑️']);
            (0, display_lib_1.displayBattleResult)(battleResult === 'winner' ? true : false, false);
            if (battleResult === 'looser') {
                break;
            }
        }
        else {
            let bossData = gameData_1.CharacterData.boss;
            if (gameMode === 'Dynamic') {
                bossData = (0, game_lib_1.getRandomItemFromFile)('/home/bervin_j/The_hyrule_castle/resources/bosses.json');
            }
            const boss = CharacterFactory_1.characterFactory.createCharacterFromData('boss', bossData);
            (0, display_lib_1.displayBattleStart)(floor, boss.name);
            let battleResult = (0, game_lib_1.battle)(player, boss, ['Attaquer ⚔️', 'Soigner ⛑️']);
            (0, display_lib_1.displayBattleResult)(battleResult === 'winner' ? true : false, true);
        }
    }
    readlineSync.keyIn((0, utils_1.logCenteredText)('\x1b[5;90m Appuyez sur n\'importe quelle touche pour retourner au menu principal \x1b[0m', '='));
    (0, main_1.enterGame)();
}
