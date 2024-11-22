"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateGainOfStatics = activateGainOfStatics;
exports.getRandomExp = getRandomExp;
const utils_1 = require("../utils/utils");
const readlineSync = require('readline-sync');
function activateGainOfStatics(gameStates) {
    gameStates.randomExp = true;
}
function getRandomExp(player, battleResult, gameStatesRandomExpActivate) {
    if (battleResult === 'winner' && gameStatesRandomExpActivate === true) {
        const random = (0, utils_1.getRandomNumberRange)(15, 50);
        const exp = player.exp += random;
        console.log(`\nVous avez gagné \x1b[37;1;3m${exp} xp\x1b[0m`);
        playerLevelUp(player) === undefined ? null : playerLevelUp(player);
    }
}
function playerLevelUp(player) {
    const levelUpPoint = player.expMax;
    if (player.exp >= levelUpPoint) {
        let remainingExpPoints = 0;
        while (player.exp >= levelUpPoint) {
            remainingExpPoints = player.exp -= levelUpPoint;
            player.level += 1;
            console.log(`\x1b[4mVous passez au niveau supérieur\x1b[4m\n`);
            console.log(`\x1b[30;47;1m ************* niveau ${player.level} ************* \x1b[0m\n`);
            console.log(`Bravo vous avez atteint le \x1b[37mniveau ${player.level}\x1b[0m`);
            console.log('- Vous avez obtenu une récompense \x1b[32;1m+1\x1b[0m');
            levelUpPlayerStats(player);
        }
        player.exp = remainingExpPoints;
        readlineSync.keyIn('\n\x1b[5;90m=== Appuyez sur n\'importe quelle touche pour retourner au menu principal ===\x1b[0m');
    }
}
function levelUpPlayerStats(player) {
    const statsToIncrease = ['exp', 'def', 'res', 'str', 'spd'];
    const randomStatIndex = (0, utils_1.getRandomNumberRange)(0, statsToIncrease.length - 1);
    const statToUpgrade = statsToIncrease[randomStatIndex];
    const statIncreaseValue = (0, utils_1.getRandomNumberRange)(1, 5);
    console.log(`\nRécompense : amélioration de vos \x1b[37m${statToUpgrade}\x1b[37m\n`);
    console.log(`Ancienne stat : \x1b[31;1m${player[statToUpgrade]}\x1b[0m ${statToUpgrade}   |   Nouvelle stat : \x1b[32;1m${player[statToUpgrade] + statIncreaseValue}\x1b[0m ${statToUpgrade}`);
    //return (player[statToUpgrade] as number) =+ statIncreaseValue;
    player[statToUpgrade] = player[statToUpgrade] + statIncreaseValue;
}
