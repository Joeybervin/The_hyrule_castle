import { Room } from "./Room"

export class FightingRoom extends Room {
    enter(): void {
        console.log('Vous êtes entré dans une room de combat')
    }
}