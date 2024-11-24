import { logCenteredText } from "../../utils/utils";
import { IRoom } from "../../interfaces/IRoom";

const readlineSync = require('readline-sync');

export abstract class Room implements IRoom {
    
    type: string;
    
    constructor(infos: IRoom){
        this.type = infos.type
    }

    roomDescription(): void {
        process.stdout.write('\x1Bc');
        logCenteredText(`Bienvenue dans une ${this.type} room !!`, ' ')
    };

    quitRoom(): void {
        logCenteredText(' Pour sortir cliquez sur Q ', '=');

        while (true) {
            let confirmation = readlineSync.question('');
    
            if (confirmation.toLowerCase() === 'q') {
                return;
            } else {
                logCenteredText(' Choix invalide. Pour quitter appuyez sur Q ', '-');
            }
        }
        
    }

}