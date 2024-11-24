import { ICharacter } from "../../interfaces/ICharacter";
import { Boss } from "./Boss";
import { Enemy } from "./Enemy";
import { Player } from "./Player";

const fs = require("fs");

export class characterFactory {
    static createCharacterFromData(type: 'player' | 'enemy' | 'boss', characterData: ICharacter): Player | Enemy | Boss  {
        switch(type) {
            case 'player':
                return new Player(characterData);
            case 'enemy':
                return new Enemy(characterData);
            case 'boss':
                return new Boss(characterData);
            default:
                throw new Error('Le personnage n\'a pas pu être instancier');
        }
    }

    static createCharacterFromJSON(type: 'player' | 'enemy' | 'boss', id: number): Player | Enemy | Boss  {
        let charactersData: ICharacter[] = [];

        switch(type) {
            case 'player':
                charactersData = this.loadCharactersFromFile('../../resources/players.json');
                break
            case 'enemy':
                charactersData = this.loadCharactersFromFile('../../resources/enemies.json');
                break
            case 'boss':
                charactersData = this.loadCharactersFromFile('../../resources/bosses.json');
                break
            default:
                throw new Error('Type de personnage invalide.');
        }

        const characterData = charactersData.find(character => character.id === id);
        if (!characterData) {
            throw new Error('Personnage avec l\'id ${id} non trouvé.')
        }
        
        return this.createCharacterFromData(type,characterData);
    }

    static loadCharactersFromFile(filePath: string): ICharacter[] {
        try {
            const rawData = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(rawData)
        } catch (error) {
            throw new Error('Erreur lors de la lecture du fichier JSON:')
        }
    }
}