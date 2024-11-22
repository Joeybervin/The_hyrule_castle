import { startBaseGame } from './src/base_game/hyrule_castle';
import { breakLine, displayGameName, displayMenu } from './src/lib/display.lib';
import { enterModGame } from './src/mods/easy/basic_game_customization';
import { logCenteredText } from './src/utils/utils';
const readlineSync = require('readline-sync');


export function enterGame() {

    displayGameName()
    displayMenu('Principal', ['Jouer au jeu de base', 'Jouer au jeu en mode dynamique', 'Jouer au jeu avec des mods', 'Quitter'])
    breakLine()

    const choice = readlineSync.question('Choisissez une option: ');
   
    switch (choice) {
        case '1':
            startBaseGame(10);
            
            break;
        case '2':
            startBaseGame(10, 'dynamic');
            break;
        case '3':
            enterModGame();
            break;
        case '4':
            logCenteredText("Merci d'avoir joué !", ' ');
            process.exit(0);
        default:
            logCenteredText("Choix invalide, veuillez réessayer.", ' ');
            enterGame();
            break;
    }
}

// process.on('SIGINT', () => {
//     console.log("\nMerci d'avoir joué ! À bientôt !");
//     process.exit(0); 
// });

enterGame()