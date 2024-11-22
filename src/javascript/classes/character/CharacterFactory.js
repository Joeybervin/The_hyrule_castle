"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterFactory = void 0;
const Boss_1 = require("./Boss");
const Enemy_1 = require("./Enemy");
const Player_1 = require("./Player");
const fs = require("fs");
class characterFactory {
    static createCharacterFromData(type, characterData) {
        switch (type) {
            case 'player':
                return new Player_1.Player(characterData);
            case 'enemy':
                return new Enemy_1.Enemy(characterData);
            case 'boss':
                return new Boss_1.Boss(characterData);
            default:
                throw new Error('Le personnage n\'a pas pu être instancier');
        }
    }
    static createCharacterFromJSON(type, id) {
        let charactersData = [];
        switch (type) {
            case 'player':
                charactersData = this.loadCharactersFromFile('../../resources/players.json');
                break;
            case 'enemy':
                charactersData = this.loadCharactersFromFile('../../resources/enemies.json');
                break;
            case 'boss':
                charactersData = this.loadCharactersFromFile('../../resources/bosses.json');
                break;
            default:
                throw new Error('Type de personnage invalide.');
        }
        const characterData = charactersData.find(character => character.id === id);
        if (!characterData) {
            throw new Error('Personnage avec l\'id ${id} non trouvé.');
        }
        return this.createCharacterFromData(type, characterData);
    }
    static loadCharactersFromFile(filePath) {
        try {
            const rawData = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(rawData);
        }
        catch (error) {
            throw new Error('Erreur lors de la lecture du fichier JSON:');
        }
    }
}
exports.characterFactory = characterFactory;
