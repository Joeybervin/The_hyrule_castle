
import fs from 'fs';

export function readJsonFile(path: string) {
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data)
}

export function createNumberRangeRegExp(min: number, max: number): RegExp {
    const reg: RegExp = new RegExp(`^[${min}-${max}]$`)
    return reg
}

export function getRandomNumberRange(min: number, max:number): number {
    return Math.ceil(Math.random() * (max - min) + min)
}

export function logCenteredText(message: string, frame: string, breakLine: boolean = true) {
    const terminalWidth = process.stdout.columns;
    const totalPadding = terminalWidth - message.length;
    
    const leftPadding = Math.floor(totalPadding / 2);
    const rightPadding = totalPadding - leftPadding;

    const bl: string = breakLine === true ? '\n' : ''

    const framedMessage = frame.repeat(leftPadding) + message + frame.repeat(rightPadding) + bl;
    console.log(framedMessage);
}

export function logLeftCenteredText(message: string, frame: string, bonusPadding: number = 40) {
    const terminalWidth = process.stdout.columns;
    const totalPadding = terminalWidth - bonusPadding;
    
    const leftPadding = Math.floor(totalPadding / 2);

    const framedMessage = frame.repeat(leftPadding) + message;
    console.log(framedMessage);
}
