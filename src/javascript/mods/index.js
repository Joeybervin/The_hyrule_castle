"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterModGame = enterModGame;
const main_1 = require("../main");
const display_lib_1 = require("../lib/display.lib");
const hyrule_castle_mod_1 = require("./hyrule_castle_mod");
const readlineSync = require('readline-sync');
function enterModGame() {
    (0, display_lib_1.displayMenu)('Mod', ['Nouvelle partie', 'Retour au menu principal', 'Quitter']);
    const test = readlineSync.question('Choisissez une option: ');
    switch (test) {
        case '1':
            (0, hyrule_castle_mod_1.startModsGame)(10);
            break;
        case '2':
            (0, main_1.enterGame)();
            break;
        case '3':
            console.log("Merci d'avoir joué !");
            process.exit(0);
        default:
            console.log("Choix invalide, veuillez réessayer.");
            enterModGame();
            break;
    }
}
