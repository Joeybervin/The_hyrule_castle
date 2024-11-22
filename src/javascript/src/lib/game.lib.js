"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomItemFromFile = getRandomItemFromFile;
exports.getRandomItem = getRandomItem;
exports.battle = battle;
const utils_1 = require("../utils/utils");
const display_lib_1 = require("./display.lib");
function getRandomItemFromFile(path) {
    const jsonData = (0, utils_1.readJsonFile)(path);
    return getRandomItem(jsonData);
}
function getRandomItem(items) {
    let selectedItems = [];
    const randomValue = Math.random() * 100;
    if (randomValue < 50) {
        selectedItems = items.filter(char => char.rarity === 1);
    }
    else if (randomValue < 80) {
        selectedItems = items.filter(char => char.rarity === 2);
    }
    else if (randomValue < 80) {
        selectedItems = items.filter(char => char.rarity === 3);
    }
    else if (randomValue < 80) {
        selectedItems = items.filter(char => char.rarity === 4);
    }
    else {
        selectedItems = items.filter(char => char.rarity === 5);
    }
    const randomIndex = Math.floor(Math.random() * selectedItems.length);
    return selectedItems[randomIndex];
}
function battle(player, enemy, playerBattleOptions) {
    let battleFinalState = "ongoing";
    while (player.hp > 0 && enemy.hp > 0) {
        player.showHp('player');
        (0, display_lib_1.breakLine)();
        enemy.showHp('enemy');
        (0, display_lib_1.breakLine)();
        (0, utils_1.logCenteredText)(`${player.name}, c'est à ton tour de jouer!\n`, ' ', false);
        (0, display_lib_1.displayPlayerBattleOptions)(playerBattleOptions);
        const playerAction = player.chooseBattleOptions(enemy, playerBattleOptions);
        if (playerAction === 'escape') {
            const confirmEscape = player.confirmEscape(enemy.hp);
            if (confirmEscape) {
                player.escape(enemy.hp);
                battleFinalState = 'escape';
                break;
            }
            else {
                (0, utils_1.logCenteredText)(`\x1b[4m${player.name} a choisi de rester et de se battre !\x1b[0m`, ' ');
                continue;
            }
        }
        //process.stdout.write('\x1Bc');
        if (enemy.hp <= 0) {
            (0, display_lib_1.breakLine)();
            enemy.showHp('enemy');
            battleFinalState = "winner";
            break;
        }
        if (playerAction === 'protect') {
            let damage = enemy.attack(player, true);
            player.protect(enemy, damage);
        }
        else {
            enemy.attack(player, false);
        }
        if (player.hp <= 0) {
            battleFinalState = "looser";
            break;
        }
    }
    return battleFinalState;
}
