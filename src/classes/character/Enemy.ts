import { ICharacter } from "../../interfaces/ICharacter";
import { Character } from "./Character";

export class Enemy extends Character {

    constructor(characterData: ICharacter) {
        super(characterData)
    }
}