import { enterGame } from '../../main';
import { displayDifficultyDescription, displayMenu } from '../../lib/display.lib';
import { startModsGame } from '../hyrule_castle'; 
import { createNumberRangeRegExp, logCenteredText } from '../../utils/utils';
import { Player } from '../../classes/character/Player';
import { GameStatesDifficulty } from '../../interfaces/GameStates';
import { addNewOptionToMenu } from '../intermediate/save';

const readlineSync = require('readline-sync');

export function enterModGame(): void {

    let menuOptions: string[] = ['Nouvelle partie', 'Retour au menu principal', 'Quitter']

    addNewOptionToMenu(menuOptions)

    displayMenu('Mod', menuOptions)

    const choice = readlineSync.question('Choisissez une option: ');

    if (choice === '2' && menuOptions.length === 4 && menuOptions[1] === "Reprendre la partie") {
        startModsGame(false);
        return;
    }

    switch (choice) {
        case '1':
            startModsGame(true);
            break;
        case '2':
            enterGame();
            break;
        case '3':
            logCenteredText('Merci d\'avoir joué !', ' ');
            process.exit(0);
        default:
            logCenteredText('Choix invalide, veuillez réessayer.', ' ');
            enterModGame();
            break;
    }
}

export function getGameDifficulty(): GameStatesDifficulty {

    let gammeDifficulty = {difficulty : 'easy', enemyBoost : 1};

    displayMenu('difficulté', ['Normal', 'Difficile', 'Infernal', 'Retour'], true);

    displayDifficultyDescription()

    const choice = readlineSync.question(' : ');

    switch (choice) {
        case '1':
            gammeDifficulty = {difficulty : 'easy', enemyBoost : 1};
            break;
        case '2':
            gammeDifficulty = {difficulty : 'difficult', enemyBoost : 1.5};
            break;
        case '3':
            gammeDifficulty = {difficulty : 'insane', enemyBoost : 2};
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

export function getGameMode(): string {
    const gameMode: string[] = ['classic', 'dynamic']
    const getRandomMode = Math.floor(Math.random() * ((1-0)+1) + 0);
    return gameMode[getRandomMode]
}

export function boostEnemyStats(enemyData: any, levelDifficultyBoost: number) {

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

    return enemyStatsBoostedDatas
}

export function getGameFloorQuantity(): number {
    const floorNumberSelection: number[] = [10, 20, 50, 100];

    logCenteredText(' Quelle taille fera votre tour ? ', '-');
    logCenteredText(floorNumberSelection.map((level, index) => `[${index + 1}] ${level}`).join('         '), ' ', false);
    let answer: string = readlineSync.question(' : ');
    const validAnswerRegExp: RegExp = createNumberRangeRegExp(1,4);
    if (!validAnswerRegExp.test(answer)) {
        logCenteredText('\x1b[31mErreur ! Entrer une valeur valide !\x1b[0m', ' ');
        answer = readlineSync.question(' : ');
    }
    
    return floorNumberSelection[parseInt(answer) - 1];
}

export function initPlayerCoins(player: Player, amont: number): void {
    player.coins! += amont;
}