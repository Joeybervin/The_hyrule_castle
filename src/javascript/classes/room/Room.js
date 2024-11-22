"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const utils_1 = require("../../utils/utils");
const readlineSync = require('readline-sync');
class Room {
    constructor(infos) {
        this.type = infos.type;
    }
    roomDescription() {
        process.stdout.write('\x1Bc');
        (0, utils_1.logCenteredText)(`Bienvenue dans une ${this.type} room !!`, ' ');
    }
    ;
    quitRoom() {
        (0, utils_1.logCenteredText)(' Pour sortir cliquez sur Q ', '=');
        while (true) {
            let confirmation = readlineSync.question('');
            if (confirmation.toLowerCase() === 'q') {
                return;
            }
            else {
                (0, utils_1.logCenteredText)(' Choix invalide. Pour quitter appuyez sur Q ', '-');
            }
        }
    }
}
exports.Room = Room;
