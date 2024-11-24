import { CharacterData } from '../lib/gameData';
import { battle, BattleStatus, getRandomItemFromFile } from '../lib/game.lib';
import { characterFactory } from '../classes/character/CharacterFactory';
import { displayBattleResult, displayBattleStart, displayGameIntroduction, displayTourIntroduction } from '../lib/display.lib';
import { enterGame } from '../main';
import { ICharacter } from '../interfaces/ICharacter';
import { boostEnemyStats, getGameDifficulty, getGameFloorQuantity, getGameMode, initPlayerCoins } from './easy/basic_game_customization';
import { Player } from '../classes/character/Player';
import { Enemy } from '../classes/character/Enemy';
import { Boss } from '../classes/character/Boss';
import { addPlayerBattleOptions } from './easy/better_combat_option';
import { initStatsPlus } from './easy/more_statistics';
import { activateGainOfStatics, getRandomExp } from './easy/level_and_experience';
import { GameStates, GameStatesDifficulty } from '../interfaces/GameStates'
import { activateRandomRoomEvent, randomRoomEvent } from './intermediate/random_game_event';
import { TrapRoom } from '../classes/room/TrapRoom';
import { TreasureRoom } from '../classes/room/TreasureRoom';
import { saveGameData } from './intermediate/save';
import { logCenteredText, readJsonFile } from '../utils/utils';
import { GameSaved } from '../interfaces/GameSaved';
import { addPlayerBattleCharacterOption } from './intermediate/basic_characteristics';

const readlineSync = require('readline-sync');

export function startModsGame(newGame: boolean) {

    let gameStates: GameStates = {
        difficulty: '',
        enemyBoost: 0,
        randomExp: false,
        gameMode: '',
        roomLevel: 10,
        gamePlayerStatsPlus: false,
        randomRoomEvent: false
    };
    let floor: number = 1;
    let player: Player | Enemy | Boss;

    let playerBattleOptionsArr: string[] = ['Attaquer ⚔️', 'Soigner ⛑️']
    playerBattleOptionsArr = addPlayerBattleOptions(playerBattleOptionsArr)
    playerBattleOptionsArr = addPlayerBattleCharacterOption(playerBattleOptionsArr)
    
    if (newGame === true) {
        
        const gameDifficulty: GameStatesDifficulty = getGameDifficulty()
        gameStates.difficulty = gameDifficulty.difficulty;
        gameStates.enemyBoost = gameDifficulty.enemyBoost;
        gameStates.gameMode = getGameMode();
        gameStates.roomLevel = getGameFloorQuantity();
        activateGainOfStatics(gameStates);
        activateRandomRoomEvent(gameStates);
    
        let playerData: ICharacter = CharacterData.player
        if (gameStates.gameMode === 'dynamic') {
            playerData = getRandomItemFromFile('/home/bervin_j/The_hyrule_castle/resources/players.json')
        }
        player = characterFactory.createCharacterFromData('player', playerData)
        initPlayerCoins((player as Player), 12)
        initStatsPlus(player);
    
        displayTourIntroduction(gameStates.roomLevel, (player as Player))
        displayGameIntroduction(player);
    } else {
        let data: GameSaved = readJsonFile('/home/bervin_j/The_hyrule_castle/resources/.gameSave.json');

        player = characterFactory.createCharacterFromData('player', data.player)
        gameStates = data.gameStates;
        floor = data.lastLevelPlayed
    }
    

    for (floor; floor <= gameStates.roomLevel; floor++) {
        if (floor < gameStates.roomLevel) {

            let enemyData: ICharacter = CharacterData.enemy
            if (gameStates.gameMode === 'dynamic') {
                enemyData = getRandomItemFromFile('/home/bervin_j/The_hyrule_castle/resources/enemies.json')
            }

            boostEnemyStats(enemyData, gameStates.enemyBoost)
            const enemy: Enemy = characterFactory.createCharacterFromData('enemy', enemyData);
            initStatsPlus(enemy);

            displayBattleStart(floor, enemy.name)
            

            let battleResult: BattleStatus = battle((player as Player), enemy, playerBattleOptionsArr);
            if (battleResult === 'escape') {floor + 1;}
            

            displayBattleResult(battleResult === 'winner' ? true : false, false);

            battleResult === 'winner' ? saveGameData({"player" : player, 'gameStates' : gameStates, 'lastLevelPlayed': floor + 1 }) : null
            if (battleResult === 'looser') {break;}
            
            getRandomExp((player as Player), battleResult, gameStates.randomExp);
            let roomEvent: TrapRoom | TreasureRoom | string = randomRoomEvent(gameStates.randomRoomEvent, 'enemy', battleResult);
            if (typeof roomEvent !== 'string') {
                roomEvent.enter((player as Player));
            } else {
                logCenteredText(roomEvent, ' ')
            }
            

        } else {
            let bossData: ICharacter = CharacterData.boss
            if (gameStates.gameMode === 'Dynamic') {
                bossData = getRandomItemFromFile('/home/bervin_j/The_hyrule_castle/resources/bosses.json')
            }

            boostEnemyStats(bossData, gameStates.enemyBoost)
            const boss: Boss = characterFactory.createCharacterFromData('boss', bossData);
            initStatsPlus(boss);

            displayBattleStart(floor, boss.name)
            let battleResult: BattleStatus = battle((player as Player), boss, playerBattleOptionsArr);
            displayBattleResult(battleResult === 'winner' ? true : false, true);
            battleResult === 'winner' ? saveGameData({'player' : player, 'gameStates' : gameStates, 'lastLevelPlayed': floor + 1}) : null
            if (gameStates.roomLevel !== floor) {
                getRandomExp((player as Player), battleResult,gameStates.randomExp)
            }
            let roomEvent: TrapRoom | TreasureRoom | string = randomRoomEvent(gameStates.randomRoomEvent, 'boss', battleResult);
            if (typeof roomEvent !== 'string') {
                roomEvent.enter((player as Player));
            } else {
                logCenteredText(roomEvent , ' ')
            }
        }
    }
    readlineSync.keyIn(logCenteredText('\n\x1b[5;90m=== Appuyez sur n\'importe quelle touche pour retourner au menu principal ===\x1b[0m', '='));
    enterGame();
}
