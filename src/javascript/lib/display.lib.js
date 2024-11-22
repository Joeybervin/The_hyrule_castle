"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayGameIntroduction = displayGameIntroduction;
exports.displayMenu = displayMenu;
exports.displayTourIntroduction = displayTourIntroduction;
exports.displayBattleStart = displayBattleStart;
exports.displayPlayerBattleOptions = displayPlayerBattleOptions;
exports.displayBattleResult = displayBattleResult;
exports.displayDifficultyDescription = displayDifficultyDescription;
exports.displayGameName = displayGameName;
exports.breakLine = breakLine;
const utils_1 = require("../utils/utils");
const readlineSync = require('readline-sync');
function displayGameIntroduction(player) {
    console.clear();
    breakLine();
    (0, utils_1.logCenteredText)("\x1b[36;3;1mBienvenue dans le Château de Hyrule\x1b[0m !", ' ');
    (0, utils_1.logCenteredText)(`Vous incarnez l'intrépide ${player.name}, un héros prêt à affronter les périls de cette tour mystique.`, ' ');
    readlineSync.keyIn((0, utils_1.logCenteredText)('\x1b[5;90m=== Appuyez sur n’importe quelle touche pour débuter l’aventure ===\x1b[0m', '='));
    process.stdout.write('\x1Bc');
    (0, utils_1.logCenteredText)(`Bienvenue, vaillant ${player.name} ! Vous possédez ${player.hp} points de vie et ${player.str} points de force.`, ' ');
}
function displayMenu(menuName, menuOptions, oneLineDisplay = false) {
    if (menuName !== 'Principal') {
        console.clear();
    }
    (0, utils_1.logCenteredText)(` Menu ${menuName} `, '=');
    if (oneLineDisplay === true) {
        (0, utils_1.logCenteredText)(menuOptions.map((option, index) => `[${index + 1}] ${option}`).join('         '), ' ', false);
    }
    else {
        menuOptions.forEach((option, index) => {
            (0, utils_1.logLeftCenteredText)(`[${index + 1}] ${option}`, ' ');
        });
    }
}
function displayTourIntroduction(floorLevel, player) {
    process.stdout.write('\x1Bc');
    (0, utils_1.logCenteredText)('Bien le bonjour, jeune aventurier !', ' ');
    (0, utils_1.logCenteredText)(`En ce jour de quête, tu incarnes l'intrépide \x1b[33;1m${player.name}\x1b[0m`, ' ', false);
    (0, utils_1.logCenteredText)('Le village de \x1b[35;1mJallia\x1b[0m est en péril et fait appel à ton courage.', ' ', false);
    (0, utils_1.logCenteredText)("Depuis maintenant plusieurs années, une mystérieuse tour s'est dressée non loin du village...", ' ', false);
    (0, utils_1.logCenteredText)("De cette tour, surgissent des hordes de monstres qui sèment la terreur et plongent Jallia dans le désespoir.", ' ');
    (0, utils_1.logCenteredText)('Ta mission, si tu l’acceptes :', ' ');
    (0, utils_1.logCenteredText)('** Gravir les étages de cette tour et vaincre les créatures qui la peuplent **', ' ');
    (0, utils_1.logCenteredText)('Pour enfin restaurer la paix dans ce village que tu chéris.', ' ', false);
    (0, utils_1.logCenteredText)('Te voici désormais face au \x1b[33mlégendaire château de Hyrule.\x1b[0m', ' ', false);
    (0, utils_1.logCenteredText)(`La tour de Hyrule : \x1b[31;1m${floorLevel}\x1b[0m étages de défis t’attendent...\n`, ' ');
    (0, utils_1.logCenteredText)(`\x1b[30;47;1mBonne chance, valeureux ${player.name}\x1b[0m`, ' ');
    readlineSync.keyIn((0, utils_1.logCenteredText)('\x1b[5;90m=== Appuyez sur n’importe quelle touche pour débuter l’aventure ===\x1b[0m', '='));
}
function displayBattleStart(floorLevel, enemyName) {
    process.stdout.write('\x1Bc');
    (0, utils_1.logCenteredText)(`Tu te retrouves nez à nez avec ${floorLevel % 10 === 0 ? '' : 'un'} ${enemyName} redoutable.`, ' ');
    (0, utils_1.logCenteredText)("L'ennemi ne compte pas te laisser passer... Prépare-toi à te battre !", ' ');
    (0, utils_1.logCenteredText)(` \x1b[37;1mFIGHT ${floorLevel}\x1b[0m `, '=');
    console.log(`${floorLevel % 10 === 0 ? '\n ************************************************************** BOSS LEVEL ************************************************************** ' : ''}`);
}
function displayPlayerBattleOptions(playerBattleOptions) {
    (0, utils_1.logCenteredText)(' Options ', '-');
    (0, utils_1.logCenteredText)(playerBattleOptions.map((option, index) => `[${index + 1}] ${option}`).join('     '), ' ');
}
function displayBattleResult(isPlayerWinner, isBossBattle) {
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
            (0, utils_1.logCenteredText)(" TU AS VAINCU LE BOSS ! ", '*');
        }
        else {
            breakLine();
            (0, utils_1.logCenteredText)("\x1b[32;1m!! Félicitations ! Tu as terrassé l'ennemi !!\x1b[0m", ' ');
            (0, utils_1.logCenteredText)("\x1b[4mLa voie vers le niveau suivant t'est désormais ouverte...\x1b[0m", ' ');
            readlineSync.keyIn((0, utils_1.logCenteredText)('\x1b[5;90m Appuyez sur une touche pour poursuivre votre quête \x1b[0m', '='));
            return;
        }
    }
    else {
        if (isBossBattle) {
            process.stdout.write('\x1Bc');
            (0, utils_1.logCenteredText)(" LE BOSS T'A VAINCU... ", '*');
            (0, utils_1.logCenteredText)("C'est un sombre jour pour Hyrule...", '*');
        }
        else {
            breakLine();
            (0, utils_1.logCenteredText)("\x1b[31;1mDommage... Tu as été défait par l'ennemi.\x1b[0m", ' ');
            (0, utils_1.logCenteredText)("Mais ton aventure ne s'arrête pas là. Relève-toi, héros !", ' ');
            return;
        }
    }
}
function displayDifficultyDescription() {
    breakLine();
    (0, utils_1.logLeftCenteredText)('********************************************************************', ' ', 70);
    (0, utils_1.logLeftCenteredText)('*  \x1b[32;1mMode Normal\x1b[0m   => Les ennemis gardent leurs stats habituelles    *', ' ', 70);
    (0, utils_1.logLeftCenteredText)('*  \x1b[31;1mMode Difficile\x1b[0m => Les stats des ennemis sont boostées à \x1b[37;1mx1.5\x1b[0m    *', ' ', 70);
    (0, utils_1.logLeftCenteredText)('*  \x1b[34;1mMode Infernal\x1b[0m  => Les stats des ennemis sont boostées à \x1b[37;1mx2\x1b[0m      *', ' ', 70);
    (0, utils_1.logLeftCenteredText)('********************************************************************', ' ', 70);
    console.log('\nChoisissez soigneusement votre niveau de difficulté :');
}
function displayGameName() {
    console.clear();
    console.log(`
        ████████╗██╗  ██╗███████╗    ██╗  ██╗██╗   ██╗██████╗ ██╗   ██╗██╗     ███████╗     ██████╗ █████╗ ███████╗████████╗██╗     ███████╗
        ╚══██╔══╝██║  ██║██╔════╝    ██║  ██║╚██╗ ██╔╝██╔══██╗██║   ██║██║     ██╔════╝    ██╔════╝██╔══██╗██╔════╝╚══██╔══╝██║     ██╔════╝
           ██║   ███████║█████╗      ███████║ ╚████╔╝ ██████╔╝██║   ██║██║     █████╗      ██║     ███████║███████╗   ██║   ██║     █████╗  
           ██║   ██╔══██║██╔══╝      ██╔══██║  ╚██╔╝  ██╔══██╗██║   ██║██║     ██╔══╝      ██║     ██╔══██║╚════██║   ██║   ██║     ██╔══╝  
           ██║   ██║  ██║███████╗    ██║  ██║   ██║   ██║  ██║╚██████╔╝███████╗███████╗    ╚██████╗██║  ██║███████║   ██║   ███████╗███████╗
           ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝     ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚══════╝
                                                                                                                                            
        `);
}
function breakLine() {
    console.log('\n');
}
