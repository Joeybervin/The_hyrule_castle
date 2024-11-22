import { Enemy } from "../classes/character/Enemy";
import { Player } from "../classes/character/Player";
import { logCenteredText, readJsonFile } from "../utils/utils";
import { breakLine, displayPlayerBattleOptions } from "./display.lib";

export type BattleStatus = 'looser' | 'winner' | 'ongoing' | 'escape';

export function getRandomItemFromFile(path: string) {
    const jsonData: Array<Object> = readJsonFile(path)
    return getRandomItem(jsonData)
}

export function getRandomItem(items: any[]): any {
    let selectedItems: Array<Object> = [];

    const randomValue = Math.random() * 100;

    if (randomValue < 50) {
        selectedItems = items.filter(char => char.rarity === 1)
    } else if (randomValue < 80) {
        selectedItems = items.filter(char => char.rarity === 2)
    } else if (randomValue < 80) {
        selectedItems = items.filter(char => char.rarity === 3)
    } else if (randomValue < 80) {
        selectedItems = items.filter(char => char.rarity === 4)
    } else {
        selectedItems = items.filter(char => char.rarity === 5)
    }

    const randomIndex = Math.floor(Math.random() * selectedItems.length);

    return selectedItems[randomIndex]
}

export function battle(player: Player, enemy: Enemy, playerBattleOptions: string[]): BattleStatus{

    let battleFinalState: BattleStatus = "ongoing";
    
    while (player.hp > 0 && enemy.hp > 0) {

        player.showHp('player');
        breakLine();
        enemy.showHp('enemy');
        breakLine();
        logCenteredText(`${player.name}, c'est à ton tour de jouer!\n`, ' ', false);
        displayPlayerBattleOptions(playerBattleOptions);

        const playerAction = player.chooseBattleOptions(enemy, playerBattleOptions);
        

        if (playerAction === 'escape') {
            const confirmEscape = player.confirmEscape(enemy.hp);
            if (confirmEscape) {
                player.escape(enemy.hp);
                battleFinalState = 'escape';
                break;
            } else {
                logCenteredText(`\x1b[4m${player.name} a choisi de rester et de se battre !\x1b[0m`, ' ');
                continue;
            }
        }
        //process.stdout.write('\x1Bc');
        if (enemy.hp <= 0) {
            breakLine();
            enemy.showHp('enemy');
            battleFinalState = "winner";
            break;
        }

        if (playerAction === 'protect') {
            let damage: number = enemy.attack(player, true);
            player.protect(enemy, damage);
        } else {
            enemy.attack(player, false);
        }

        if (player.hp <= 0) {
            battleFinalState = "looser";
            break;
        }

        
    }
    return battleFinalState

}

