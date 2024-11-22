import { getRandomNumberRange, logCenteredText } from "../../utils/utils";
import { GameStates } from "../../interfaces/GameStates";
import { BattleStatus } from "../../lib/game.lib";
import { Player } from "../../classes/character/Player";

const readlineSync = require('readline-sync');

export function activateGainOfStatics(gameStates: Partial<GameStates>) {
    gameStates.randomExp = true;
}

export function getRandomExp(player: Player, battleResult: BattleStatus, gameStatesRandomExpActivate: boolean) {
    if (battleResult === 'winner'&& gameStatesRandomExpActivate === true ) {
        const random = getRandomNumberRange(15,50)
        const exp: number = player.exp += random;
        logCenteredText(`Vous avez gagné \x1b[37;1;3m${exp} xp\x1b[0m`, ' ')
        playerLevelUp(player) === undefined ? null : playerLevelUp(player);
    }
}

function playerLevelUp(player: Player){
    const levelUpPoint: number = player.expMax;
    if (player.exp >= levelUpPoint) {
        
        let remainingExpPoints: number = 0;
        
        while (player.exp >= levelUpPoint) {
            remainingExpPoints = player.exp -= levelUpPoint;
            player.level += 1;
            logCenteredText(`\x1b[4mVous passez au niveau supérieur\x1b[0m`, ' ');
            logCenteredText(`\x1b[30;47;1m niveau ${player.level} \x1b[0m`, '*');
            logCenteredText(`Bravo vous avez atteint le \x1b[37mniveau   ${player.level}   \x1b[0m`, ' ');
            logCenteredText('- Vous avez obtenu une récompense \x1b[32;1m+1\x1b[0m', ' ');
            levelUpPlayerStats(player);
        }
        player.exp = remainingExpPoints;
        
        readlineSync.keyIn(logCenteredText('\x1b[5;90m Appuyez sur n\'importe quelle touche pour retourner au menu principal \x1b[0m', '='));
    }
}

function levelUpPlayerStats(player: Player): void{
    const statsToIncrease: (keyof Player)[] = ['exp', 'def' , 'res' , 'str' , 'spd'];
    const randomStatIndex: number = getRandomNumberRange(0, statsToIncrease.length - 1)
    const statToUpgrade: keyof Player = statsToIncrease[randomStatIndex];
    const statIncreaseValue: number = getRandomNumberRange(1,5);
    logCenteredText(`Récompense : amélioration de vos \x1b[37m${statToUpgrade}\x1b[37m`, ' ')
    logCenteredText(`Ancienne stat : \x1b[31;1m${player[statToUpgrade]}\x1b[0m ${statToUpgrade}   |   Nouvelle stat : \x1b[32;1m${(player[statToUpgrade] as number) + statIncreaseValue}\x1b[0m ${statToUpgrade}`, ' ');
    //return (player[statToUpgrade] as number) =+ statIncreaseValue;
    (player[statToUpgrade] as number) = (player[statToUpgrade] as number) + statIncreaseValue
}