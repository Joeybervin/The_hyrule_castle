"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
class Character {
    constructor(characterData) {
        var _a;
        this.id = characterData.id;
        this.name = characterData.name;
        this.hp = characterData.hp;
        this.maxHP = (_a = characterData.maxHP) !== null && _a !== void 0 ? _a : characterData.hp;
        this.mp = characterData.mp;
        this.str = characterData.str;
        this.int = characterData.int;
        this.def = characterData.def;
        this.res = characterData.res;
        this.spd = characterData.spd;
        this.luck = characterData.luck;
        this.rarity = characterData.rarity;
        this.class = characterData.class;
        this.race = characterData.race;
        this.statsPlus = false;
    }
    dodge(target) {
        const dodge = (target.spd - this.spd) * 10 < 0 ? 0 : (target.spd - this.spd) * 10;
        const randomChance = Math.floor(Math.random() * 100);
        if (randomChance <= dodge) {
            console.log('\x1b[32;1mAttaque manquer\x1b[0m\n');
            return true;
        }
        return false;
    }
    attack(target, isTargetProtected) {
        let damage = 0;
        let str = this.str;
        let attackIsDodged = false;
        if (this.statsPlus === true) {
            str = Math.floor(str - target.def) < 0 ? 0 : Math.floor(str - target.def);
            attackIsDodged = this.dodge(target);
        }
        if (isTargetProtected) {
            damage = Math.floor(str / 2);
            attackIsDodged ? target.hp - 0 : target.hp -= damage;
        }
        else {
            damage = str;
            attackIsDodged ? target.hp - 0 : target.hp -= str;
            if (attackIsDodged === false) {
                console.log(`\nUne attaque à été lancé ! ${target.name} à perdu \x1b[31m${str}hp\x1b[0m \n`);
            }
        }
        if (this.hp < 0) {
            this.hp = 0;
        }
        if (target.hp < 0) {
            target.hp = 0;
        }
        return damage;
    }
    showHp(target) {
        const hpBar = Array(this.hp).fill('|').concat(Array(this.maxHP - this.hp).fill(' ')).join('');
        const hpPercentage = (this.hp / this.maxHP) * 100;
        target === 'player' ? console.log(` \x1b[37;1m${this.name}\x1b[0m  `) : console.log(`  \x1b[31;1m${this.name}\x1b[0m  `);
        if (hpPercentage > 50) {
            console.log(`HP : [ \x1b[32m${hpBar}\x1b[0m ] ${this.hp}/${this.maxHP}`);
        }
        else if (hpPercentage > 20) {
            console.log(`HP : [ \x1b[33m${hpBar}\x1b[0m ] ${this.hp}/${this.maxHP}`);
        }
        else {
            console.log(`HP : [ \x1b[31m${hpBar}\x1b[0m ] ${this.hp}/${this.maxHP}`);
        }
    }
}
exports.Character = Character;
