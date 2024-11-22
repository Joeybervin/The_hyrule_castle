import { Player } from "../classes/character/Player";
import { ICharacter } from "../classes/interfaces/ICharacter";
import { logCenteredText, logLeftCenteredText } from "../utils/utils";

const readlineSync = require('readline-sync');

export function displayGameIntroduction(player: ICharacter) {
    console.clear();
    breakLine();
    logCenteredText("\x1b[36;3;1mBienvenue dans le Château de Hyrule\x1b[0m !", ' ');
    logCenteredText(`Vous incarnez l'intrépide ${player.name}, un héros prêt à affronter les périls de cette tour mystique.`, ' ');
    readlineSync.keyIn(logCenteredText('\x1b[5;90m=== Appuyez sur n’importe quelle touche pour débuter l’aventure ===\x1b[0m', '='));
    process.stdout.write('\x1Bc');
    logCenteredText(`Bienvenue, vaillant ${player.name} ! Vous possédez ${player.hp} points de vie et ${player.str} points de force.`, ' ');
}

export function displayMenu(menuName: string, menuOptions: string[], oneLineDisplay: boolean = false) {
    if (menuName !== 'Principal') {
        console.clear()
    }
    logCenteredText(` Menu ${menuName} `, '=');
    if (oneLineDisplay === true) {
        logCenteredText(menuOptions.map((option, index) => `[${index + 1}] ${option}`).join('         '), ' ', false);
    } else {
        menuOptions.forEach((option, index) => {
            logLeftCenteredText(`[${index + 1}] ${option}`, ' ');
        });
    }
}

export function displayTourIntroduction(floorLevel: number, player: Player) {
    process.stdout.write('\x1Bc');
    logCenteredText('Bien le bonjour, jeune aventurier !', ' ');
    logCenteredText(`En ce jour de quête, tu incarnes l'intrépide \x1b[33;1m${player.name}\x1b[0m`, ' ', false);
    logCenteredText('Le village de \x1b[35;1mJallia\x1b[0m est en péril et fait appel à ton courage.', ' ', false);
    logCenteredText("Depuis maintenant plusieurs années, une mystérieuse tour s'est dressée non loin du village...", ' ', false);
    logCenteredText("De cette tour, surgissent des hordes de monstres qui sèment la terreur et plongent Jallia dans le désespoir.", ' ');
    logCenteredText('Ta mission, si tu l’acceptes :', ' ');
    logCenteredText('** Gravir les étages de cette tour et vaincre les créatures qui la peuplent **', ' ');
    logCenteredText('Pour enfin restaurer la paix dans ce village que tu chéris.', ' ', false);

    logCenteredText('Te voici désormais face au \x1b[33mlégendaire château de Hyrule.\x1b[0m', ' ', false);
    logCenteredText(`La tour de Hyrule : \x1b[31;1m${floorLevel}\x1b[0m étages de défis t’attendent...\n`, ' ');

    logCenteredText(`\x1b[30;47;1mBonne chance, valeureux ${player.name}\x1b[0m`, ' ');
    readlineSync.keyIn(logCenteredText('\x1b[5;90m=== Appuyez sur n’importe quelle touche pour débuter l’aventure ===\x1b[0m', '='));

}

export function displayBattleStart(floorLevel: number, enemyName: string) {
    
    process.stdout.write('\x1Bc');
    logCenteredText(`Tu te retrouves nez à nez avec ${floorLevel % 10 === 0 ? '' : 'un'} ${enemyName} redoutable.`, ' ');
    logCenteredText("L'ennemi ne compte pas te laisser passer... Prépare-toi à te battre !", ' ');
    logCenteredText(` \x1b[37;1mFIGHT ${floorLevel}\x1b[0m `, '=');
    console.log(`${floorLevel % 10 === 0 ? '\n ************************************************************** BOSS LEVEL ************************************************************** ' : ''}`);
}

export function displayPlayerBattleOptions(playerBattleOptions: string[]) {
    logCenteredText(' Options ', '-');
    logCenteredText(playerBattleOptions.map((option, index) => `[${index + 1}] ${option}`).join('     '), ' ');
}

export function displayBattleResult(isPlayerWinner: boolean, isBossBattle: boolean) {
   
    if (isPlayerWinner) {
        if (isBossBattle) {
            process.stdout.write('\x1Bc');
            breakLine();
            console.log(` 
███████╗███████╗██╗     ██╗ ██████╗██╗████████╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗███████╗
██╔════╝██╔════╝██║     ██║██╔════╝██║╚══██╔══╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
█████╗  █████╗  ██║     ██║██║     ██║   ██║   ███████║   ██║   ██║██║   ██║██╔██╗ ██║███████╗
██╔══╝  ██╔══╝  ██║     ██║██║     ██║   ██║   ██╔══██║   ██║   ██║██║   ██║██║╚██╗██║╚════██║
██║     ███████╗███████╗██║╚██████╗██║   ██║   ██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║███████║
╚═╝     ╚══════╝╚══════╝╚═╝ ╚═════╝╚═╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝`);
            logCenteredText(" TU AS VAINCU LE BOSS ! ", '*');
        } else {
            breakLine()
            logCenteredText("\x1b[32;1m!! Félicitations ! Tu as terrassé l'ennemi !!\x1b[0m", ' ');
            logCenteredText("\x1b[4mLa voie vers le niveau suivant t'est désormais ouverte...\x1b[0m", ' ');
            readlineSync.keyIn(logCenteredText('\x1b[5;90m Appuyez sur une touche pour poursuivre votre quête \x1b[0m', '='));
            return;
        }
    } else {
        if (isBossBattle) {
            process.stdout.write('\x1Bc');
            logCenteredText(" LE BOSS T'A VAINCU... ", '*');
            logCenteredText("C'est un sombre jour pour Hyrule...", '*');
        } else {
            breakLine();
            logCenteredText("\x1b[31;1mDommage... Tu as été défait par l'ennemi.\x1b[0m", ' ');
            logCenteredText("Mais ton aventure ne s'arrête pas là. Relève-toi, héros !", ' ');
            return;
        }
        
    }
    

}

export function displayDifficultyDescription() {
    breakLine();
    logLeftCenteredText('********************************************************************', ' ', 70);
    logLeftCenteredText('*  \x1b[32;1mMode Normal\x1b[0m   => Les ennemis gardent leurs stats habituelles    *', ' ', 70);
    logLeftCenteredText('*  \x1b[31;1mMode Difficile\x1b[0m => Les stats des ennemis sont boostées à \x1b[37;1mx1.5\x1b[0m    *', ' ', 70);
    logLeftCenteredText('*  \x1b[34;1mMode Infernal\x1b[0m  => Les stats des ennemis sont boostées à \x1b[37;1mx2\x1b[0m      *', ' ', 70);
    logLeftCenteredText('********************************************************************', ' ', 70);
    console.log('\nChoisissez soigneusement votre niveau de difficulté :');

}

export function displayGameName() {
    console.clear();
    console.log(`
        ████████╗██╗  ██╗███████╗    ██╗  ██╗██╗   ██╗██████╗ ██╗   ██╗██╗     ███████╗     ██████╗ █████╗ ███████╗████████╗██╗     ███████╗
        ╚══██╔══╝██║  ██║██╔════╝    ██║  ██║╚██╗ ██╔╝██╔══██╗██║   ██║██║     ██╔════╝    ██╔════╝██╔══██╗██╔════╝╚══██╔══╝██║     ██╔════╝
           ██║   ███████║█████╗      ███████║ ╚████╔╝ ██████╔╝██║   ██║██║     █████╗      ██║     ███████║███████╗   ██║   ██║     █████╗  
           ██║   ██╔══██║██╔══╝      ██╔══██║  ╚██╔╝  ██╔══██╗██║   ██║██║     ██╔══╝      ██║     ██╔══██║╚════██║   ██║   ██║     ██╔══╝  
           ██║   ██║  ██║███████╗    ██║  ██║   ██║   ██║  ██║╚██████╔╝███████╗███████╗    ╚██████╗██║  ██║███████║   ██║   ███████╗███████╗
           ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝     ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚══════╝
                                                                                                                                            
        `)
}

export function breakLine() {
    console.log('\n')
}