"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJsonFile = readJsonFile;
exports.createNumberRangeRegExp = createNumberRangeRegExp;
exports.getRandomNumberRange = getRandomNumberRange;
exports.logCenteredText = logCenteredText;
exports.logLeftCenteredText = logLeftCenteredText;
const fs_1 = __importDefault(require("fs"));
function readJsonFile(path) {
    const data = fs_1.default.readFileSync(path, 'utf8');
    return JSON.parse(data);
}
function createNumberRangeRegExp(min, max) {
    const reg = new RegExp(`^[${min}-${max}]$`);
    return reg;
}
function getRandomNumberRange(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}
function logCenteredText(message, frame, breakLine = true) {
    const terminalWidth = process.stdout.columns;
    const totalPadding = terminalWidth - message.length;
    const leftPadding = Math.floor(totalPadding / 2);
    const rightPadding = totalPadding - leftPadding;
    const bl = breakLine === true ? '\n' : '';
    const framedMessage = frame.repeat(leftPadding) + message + frame.repeat(rightPadding) + bl;
    console.log(framedMessage);
}
function logLeftCenteredText(message, frame, bonusPadding = 40) {
    const terminalWidth = process.stdout.columns;
    const totalPadding = terminalWidth - bonusPadding;
    const leftPadding = Math.floor(totalPadding / 2);
    const framedMessage = frame.repeat(leftPadding) + message;
    console.log(framedMessage);
}
