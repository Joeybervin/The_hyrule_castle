import fs from 'fs';
import { GameSaved } from '../../interfaces/GameSaved';
import { logCenteredText } from '../../utils/utils';

const readlineSync = require('readline-sync');

export function saveGameData(gameData: GameSaved): void {
    logCenteredText('Voulez-vous sauvegarder votre avancé ?', ' ');
    logCenteredText(' Options ', '=');
    logCenteredText('[1] Oui   [2] Non', ' ');

        while (true) {
            let confirmation = readlineSync.question('sauvegarder ? : ');
    
            if (confirmation === '1') {
                createHiddenJsonFile(gameData);
                return
            } else if (confirmation === '2') {
                return;
            } else {
                logCenteredText('Choix invalide. Veuillez entrer [1] pour Oui ou [2] pour Non.', ' ');
            }

    }
}

function createHiddenJsonFile(gameData: GameSaved): void {
    const coco = JSON.stringify(gameData)
    if (fs.existsSync('resources/.gameSave.json')) {

        fs.writeFileSync('resources/.gameSave.json', coco, 'utf8');
        
      } else {

        fs.writeFileSync('resources/.gameSave.json', coco, 'utf8');
        logCenteredText('sauvegardé', ' ')
       
      }
      return;
}

export function addNewOptionToMenu(menuOptions: string[]) {
    if (fs.existsSync('resources/.gameSave.json')) {

       menuOptions.splice(1, 0, 'Reprendre la partie')
      } 
}