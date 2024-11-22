import { ICharacter } from "../interfaces/ICharacter";
import { Enemy } from "./Enemy";

export class Boss extends Enemy {
    constructor(characterData: ICharacter) {
        super(characterData)
    }
}