"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startModsGame = startModsGame;
const gameData_1 = require("../lib/gameData");
const game_lib_1 = require("../lib/game.lib");
const CharacterFactory_1 = require("../classes/character/CharacterFactory");
const display_lib_1 = require("../lib/display.lib");
const main_1 = require("../../main");
const basic_game_customization_1 = require("./easy/basic_game_customization");
const better_combat_option_1 = require("./easy/better_combat_option");
const more_statistics_1 = require("./easy/more_statistics");
const level_and_experience_1 = require("./easy/level_and_experience");
const random_game_event_1 = require("./intermediate/random_game_event");
const save_1 = require("./intermediate/save");
const utils_1 = require("../utils/utils");
const basic_characteristics_1 = require("./intermediate/basic_characteristics");
const readlineSync = require('readline-sync');
function startModsGame(newGame) {
    let gameStates = {
        difficulty: '',
        enemyBoost: 0,
        randomExp: false,
        gameMode: '',
        roomLevel: 10,
        gamePlayerStatsPlus: false,
        randomRoomEvent: false
    };
    let floor = 1;
    let player;
    let playerBattleOptionsArr = ['Attaquer ⚔️', 'Soigner ⛑️'];
    playerBattleOptionsArr = (0, better_combat_option_1.addPlayerBattleOptions)(playerBattleOptionsArr);
    playerBattleOptionsArr = (0, basic_characteristics_1.addPlayerBattleCharacterOption)(playerBattleOptionsArr);
    if (newGame === true) {
        const gameDifficulty = (0, basic_game_customization_1.getGameDifficulty)();
        gameStates.difficulty = gameDifficulty.difficulty;
        gameStates.enemyBoost = gameDifficulty.enemyBoost;
        gameStates.gameMode = (0, basic_game_customization_1.getGameMode)();
        gameStates.roomLevel = (0, basic_game_customization_1.getGameFloorQuantity)();
        (0, level_and_experience_1.activateGainOfStatics)(gameStates);
        (0, random_game_event_1.activateRandomRoomEvent)(gameStates);
        let playerData = gameData_1.CharacterData.player;
        if (gameStates.gameMode === 'dynamic') {
            playerData = (0, game_lib_1.getRandomItemFromFile)('/home/bervin_j/The_hyrule_castle/resources/players.json');
        }
        player = CharacterFactory_1.characterFactory.createCharacterFromData('player', playerData);
        (0, basic_game_customization_1.initPlayerCoins)(player, 12);
        (0, more_statistics_1.initStatsPlus)(player);
        (0, display_lib_1.displayTourIntroduction)(gameStates.roomLevel, player);
        (0, display_lib_1.displayGameIntroduction)(player);
    }
    else {
        let data = (0, utils_1.readJsonFile)('/home/bervin_j/The_hyrule_castle/resources/.gameSave.json');
        player = CharacterFactory_1.characterFactory.createCharacterFromData('player', data.player);
        gameStates = data.gameStates;
        floor = data.lastLevelPlayed;
    }
    for (floor; floor <= gameStates.roomLevel; floor++) {
        if (floor < gameStates.roomLevel) {
            let enemyData = gameData_1.CharacterData.enemy;
            if (gameStates.gameMode === 'dynamic') {
                enemyData = (0, game_lib_1.getRandomItemFromFile)('/home/bervin_j/The_hyrule_castle/resources/enemies.json');
            }
            (0, basic_game_customization_1.boostEnemyStats)(enemyData, gameStates.enemyBoost);
            const enemy = CharacterFactory_1.characterFactory.createCharacterFromData('enemy', enemyData);
            (0, more_statistics_1.initStatsPlus)(enemy);
            (0, display_lib_1.displayBattleStart)(floor, enemy.name);
            let battleResult = (0, game_lib_1.battle)(player, enemy, playerBattleOptionsArr);
            if (battleResult === 'escape') {
                floor + 1;
            }
            (0, display_lib_1.displayBattleResult)(battleResult === 'winner' ? true : false, false);
            battleResult === 'winner' ? (0, save_1.saveGameData)({ "player": player, 'gameStates': gameStates, 'lastLevelPlayed': floor + 1 }) : null;
            if (battleResult === 'looser') {
                break;
            }
            (0, level_and_experience_1.getRandomExp)(player, battleResult, gameStates.randomExp);
            let roomEvent = (0, random_game_event_1.randomRoomEvent)(gameStates.randomRoomEvent, 'enemy', battleResult);
            if (typeof roomEvent !== 'string') {
                roomEvent.enter(player);
            }
            else {
                (0, utils_1.logCenteredText)(roomEvent, ' ');
            }
        }
        else {
            let bossData = gameData_1.CharacterData.boss;
            if (gameStates.gameMode === 'Dynamic') {
                bossData = (0, game_lib_1.getRandomItemFromFile)('/home/bervin_j/The_hyrule_castle/resources/bosses.json');
            }
            (0, basic_game_customization_1.boostEnemyStats)(bossData, gameStates.enemyBoost);
            const boss = CharacterFactory_1.characterFactory.createCharacterFromData('boss', bossData);
            (0, more_statistics_1.initStatsPlus)(boss);
            (0, display_lib_1.displayBattleStart)(floor, boss.name);
            let battleResult = (0, game_lib_1.battle)(player, boss, playerBattleOptionsArr);
            (0, display_lib_1.displayBattleResult)(battleResult === 'winner' ? true : false, true);
            battleResult === 'winner' ? (0, save_1.saveGameData)({ 'player': player, 'gameStates': gameStates, 'lastLevelPlayed': floor + 1 }) : null;
            if (gameStates.roomLevel !== floor) {
                (0, level_and_experience_1.getRandomExp)(player, battleResult, gameStates.randomExp);
            }
            let roomEvent = (0, random_game_event_1.randomRoomEvent)(gameStates.randomRoomEvent, 'boss', battleResult);
            if (typeof roomEvent !== 'string') {
                roomEvent.enter(player);
            }
            else {
                (0, utils_1.logCenteredText)(roomEvent, ' ');
            }
        }
    }
    readlineSync.keyIn((0, utils_1.logCenteredText)('\n\x1b[5;90m=== Appuyez sur n\'importe quelle touche pour retourner au menu principal ===\x1b[0m', '='));
    (0, main_1.enterGame)();
}
