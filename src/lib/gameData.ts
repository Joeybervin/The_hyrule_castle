import { Boss } from '../classes/character/Boss';
import { Enemy } from '../classes/character/Enemy';
import { Player } from '../classes/character/Player';
import { ICharacter } from '../interfaces/ICharacter';

export const CharacterData = {
    player: <Player>{
        id: 1,
        name: 'Link',
        hp: 60,
        mp: 0,
        str: 15,
        int: 0,
        def: 0,
        res: 0,
        spd: 0,
        luck: 0,
        rarity: 0,
        class: 1,
        race: 1,
    },
    enemy: <Enemy>{
        id: 12,
        name: 'Bokoblin',
        hp: 30,
        mp: 0,
        str: 5,
        int: 0,
        def: 0,
        res: 0,
        spd: 0,
        luck: 0,
        rarity: 0,
        class: 2,
        race: 12,
    },
    boss: <Boss>{
        id: 1,
        name: 'Ganon',
        hp: 150,
        mp: 0,
        str: 20,
        int: 0,
        def: 0,
        res: 0,
        spd: 0,
        luck: 0,
        rarity: 0,
        class: 8,
        race: 12,
    },
};
