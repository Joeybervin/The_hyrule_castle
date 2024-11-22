"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveGameData = saveGameData;
exports.addNewOptionToMenu = addNewOptionToMenu;
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../utils/utils");
const readlineSync = require('readline-sync');
function saveGameData(gameData) {
    (0, utils_1.logCenteredText)('Voulez-vous sauvegarder votre avancé ?', ' ');
    (0, utils_1.logCenteredText)(' Options ', '=');
    (0, utils_1.logCenteredText)('[1] Oui   [2] Non', ' ');
    while (true) {
        let confirmation = readlineSync.question('sauvegarder ? : ');
        if (confirmation === '1') {
            createHiddenJsonFile(gameData);
            return;
        }
        else if (confirmation === '2') {
            return;
        }
        else {
            console.log('Choix invalide. Veuillez entrer [1] pour Oui ou [2] pour Non.');
        }
    }
}
function createHiddenJsonFile(gameData) {
    const coco = JSON.stringify(gameData);
    if (fs_1.default.existsSync('resources/.gameSave.json')) {
        fs_1.default.writeFileSync('resources/.gameSave.json', coco, 'utf8');
    }
    else {
        fs_1.default.writeFileSync('resources/.gameSave.json', coco, 'utf8');
        console.log('sauvegardé');
    }
    return;
}
function addNewOptionToMenu(menuOptions) {
    if (fs_1.default.existsSync('resources/.gameSave.json')) {
        menuOptions.splice(1, 0, 'Reprendre la partie');
    }
}
