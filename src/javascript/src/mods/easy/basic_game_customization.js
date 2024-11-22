"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterModGame = enterModGame;
exports.getGameDifficulty = getGameDifficulty;
exports.getGameMode = getGameMode;
exports.boostEnemyStats = boostEnemyStats;
exports.getGameFloorQuantity = getGameFloorQuantity;
exports.initPlayerCoins = initPlayerCoins;
const main_1 = require("../../../main");
const display_lib_1 = require("../../lib/display.lib");
const hyrule_castle_1 = require("../hyrule_castle");
const utils_1 = require("../../utils/utils");
const save_1 = require("../intermediate/save");
const readlineSync = require('readline-sync');
function enterModGame() {
    let menuOptions = ['Nouvelle partie', 'Retour au menu principal', 'Quitter'];
    (0, save_1.addNewOptionToMenu)(menuOptions);
    (0, display_lib_1.displayMenu)('Mod', menuOptions);
    const choice = readlineSync.question('Choisissez une option: ');
    if (choice === '2' && menuOptions.length === 4 && menuOptions[1] === "Reprendre la partie") {
        (0, hyrule_castle_1.startModsGame)(false);
        return;
    }
    switch (choice) {
        case '1':
            (0, hyrule_castle_1.startModsGame)(true);
            break;
        case '2':
            (0, main_1.enterGame)();
            break;
        case '3':
            (0, utils_1.logCenteredText)('Merci d\'avoir joué !', ' ');
            process.exit(0);
        default:
            (0, utils_1.logCenteredText)('Choix invalide, veuillez réessayer.', ' ');
            enterModGame();
            break;
    }
}
function getGameDifficulty() {
    let gammeDifficulty = { difficulty: 'easy', enemyBoost: 1 };
    (0, display_lib_1.displayMenu)('difficulté', ['Normal', 'Difficile', 'Infernal', 'Retour'], true);
    (0, display_lib_1.displayDifficultyDescription)();
    const choice = readlineSync.question(' : ');
    switch (choice) {
        case '1':
            gammeDifficulty = { difficulty: 'easy', enemyBoost: 1 };
            break;
        case '2':
            gammeDifficulty = { difficulty: 'difficult', enemyBoost: 1.5 };
            break;
        case '3':
            gammeDifficulty = { difficulty: 'insane', enemyBoost: 2 };
            break;
        case '4':
            enterModGame();
            break;
        default:
            console.log('Choix invalide, veuillez réessayer.');
            getGameDifficulty();
            break;
    }
    return gammeDifficulty;
}
function getGameMode() {
    const gameMode = ['classic', 'dynamic'];
    const getRandomMode = Math.floor(Math.random() * ((1 - 0) + 1) + 0);
    return gameMode[getRandomMode];
}
function boostEnemyStats(enemyData, levelDifficultyBoost) {
    // for (let key in enemyData) {
    //     if (typeof enemyData[key] === 'number' && key !== 'id') {
    //         enemyData[key] = Math.floor(enemyData[key] * levelDifficultyBoost)
    //     }
    // }
    const enemyStatsBoostedDatas = Object.keys(enemyData).forEach(stat => {
        if (typeof enemyData[stat] === 'number' && stat !== 'id') {
            enemyData[stat] = enemyData[stat] * levelDifficultyBoost;
        }
    });
    return enemyStatsBoostedDatas;
}
function getGameFloorQuantity() {
    const floorNumberSelection = [10, 20, 50, 100];
    (0, utils_1.logCenteredText)(' Quelle taille fera votre tour ? ', '-');
    (0, utils_1.logCenteredText)(floorNumberSelection.map((level, index) => `[${index + 1}] ${level}`).join('         '), ' ', false);
    let answer = readlineSync.question(' : ');
    const validAnswerRegExp = (0, utils_1.createNumberRangeRegExp)(1, 4);
    if (!validAnswerRegExp.test(answer)) {
        (0, utils_1.logCenteredText)('\x1b[31mErreur ! Entrer une valeur valide !\x1b[0m', ' ');
        answer = readlineSync.question(' : ');
    }
    return floorNumberSelection[parseInt(answer) - 1];
}
function initPlayerCoins(player, amont) {
    player.coins += amont;
}
