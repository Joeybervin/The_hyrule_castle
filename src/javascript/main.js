"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playMusic = playMusic;
exports.enterGame = enterGame;
const hyrule_castle_1 = require("./src/base_game/hyrule_castle");
const display_lib_1 = require("./src/lib/display.lib");
const basic_game_customization_1 = require("./src/mods/easy/basic_game_customization");
const utils_1 = require("./src/utils/utils");
const readlineSync = require('readline-sync');
const player = require('play-sound')({ player: 'mpg123' });
let audioProcess = null;
function playMusic(filePath) {
    if (audioProcess) {
        console.log("Music is already playing.");
        return;
    }
    audioProcess = player.play(filePath, (err) => {
        if (err)
            console.error("Could not play sound:", err);
        audioProcess = null; // Reset when music stops
    });
}
function enterGame() {
    (0, display_lib_1.displayGameName)();
    (0, display_lib_1.displayMenu)('Principal', ['Jouer au jeu de base', 'Jouer au jeu en mode dynamique', 'Jouer au jeu avec des mods', 'Quitter']);
    (0, display_lib_1.breakLine)();
    playMusic("/home/bervin_j/The_hyrule_castle/resources/music/gameover.mp3");
    //  let choice: string | string[] = ''
    // console.log(args)
    // if (args != undefined || args != '') {
    //     choice = args
    // }   else {
    //     choice = readlineSync.question('Choisissez une option: ');
    // }
    const choice = readlineSync.question('Choisissez une option: ');
    switch (choice) {
        case '1':
            (0, hyrule_castle_1.startBaseGame)(10);
            break;
        case '2':
            (0, hyrule_castle_1.startBaseGame)(10, 'dynamic');
            break;
        case '3':
            (0, basic_game_customization_1.enterModGame)();
            break;
        case '4':
            (0, utils_1.logCenteredText)("Merci d'avoir joué !", ' ');
            process.exit(0);
        default:
            (0, utils_1.logCenteredText)("Choix invalide, veuillez réessayer.", ' ');
            enterGame();
            break;
    }
}
// process.on('SIGINT', () => {
//     console.log("\nMerci d'avoir joué ! À bientôt !");
//     process.exit(0); 
// });
enterGame();
