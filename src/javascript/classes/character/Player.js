"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const display_lib_1 = require("../../lib/display.lib");
const utils_1 = require("../../utils/utils");
const Character_1 = require("./Character");
const readlineSync = require('readline-sync');
class Player extends Character_1.Character {
    constructor(characterData, coins = 0, exp = 0, expMax = 85, level = 1) {
        super(characterData);
        this.coins = 0;
        this.exp = 0;
        this.expMax = 85;
        this.level = 0;
        this.coins = coins;
        this.exp = exp;
        this.level = level;
        this.expMax = expMax;
    }
    heal() {
        console.log(`Cette potion vous rapporte \x1b[32m${this.maxHP / 2}hp\x1b[0m en plus !`);
        this.hp += (this.maxHP / 2);
        if (this.hp > this.maxHP) {
            this.hp = this.maxHP;
        }
        return this.hp;
    }
    protect(enemy, enemyDamage) {
        console.log(`${enemy.name} vous as attaqué mais grace à votre \x1b[34mbouclier\x1b[0m vous ne subissez que \x1b[33m${enemyDamage}\x1b[33m de dégats\n`);
    }
    confirmEscape(enemyHp) {
        (0, utils_1.logCenteredText)('\x1b[4mÊtes vous sur de vouloir fuir ?\x1b[0m', ' ');
        (0, utils_1.logCenteredText)(`Vous allez subir \x1b[31m${Math.floor(enemyHp / 2)} dégats\x1b[0m en fuyant.`, ' ');
        (0, utils_1.logCenteredText)(' Options ', '-');
        (0, utils_1.logCenteredText)('[1] Oui     [2] Non', ' ');
        while (true) {
            let confirmation = readlineSync.question('Votre choix : ');
            if (confirmation === '1') {
                return true;
            }
            else if (confirmation === '2') {
                return false;
            }
            else {
                (0, utils_1.logCenteredText)('Choix invalide. Veuillez entrer [1] pour Oui ou [2] pour Non.', ' ');
            }
        }
    }
    escape(enemyHp) {
        const damage = Math.floor(enemyHp / 2);
        process.stdout.write('\x1Bc');
        (0, utils_1.logCenteredText)('Vous prenez la fuite !', ' ');
        (0, utils_1.logCenteredText)('Votre adversaire ne compte pas vous laissez partir ainsi, Il vous prends par surprise et vous lance une dernière attaque', ' ', false);
        (0, utils_1.logCenteredText)(`Vous subissez \x1b[31m${damage} dégâts\x1b[0m en fuyant.`, ' ');
        (0, utils_1.logCenteredText)('****************************************************************************************************************************************', ' ');
        this.hp -= damage;
    }
    profil() {
        (0, utils_1.logCenteredText)(` ${this.name} profil `, '=');
        (0, utils_1.logCenteredText)('  Stats   ', '+');
        this.showStats();
        (0, utils_1.logCenteredText)('  Niveau   ', '+');
        this.showLevel();
        (0, utils_1.logCenteredText)('  Expérience   ', '+');
        this.showExp();
        (0, utils_1.logCenteredText)('  Race   ', '+');
        this.showRace();
        (0, utils_1.logCenteredText)('  class   ', '+');
        this.showClass();
        this.showCoins();
        return;
    }
    chooseBattleOptions(target, battleGameOptionsArr) {
        const battleGameOptionsArrLength = battleGameOptionsArr.length;
        let option = readlineSync.question(': ').toLowerCase();
        option.toLowerCase();
        const optionAnswerRange = (0, utils_1.createNumberRangeRegExp)(1, battleGameOptionsArrLength);
        if (optionAnswerRange.test(option) && option === '1' || option === 'attaquer') {
            this.attack(target);
            return;
        }
        else if (optionAnswerRange.test(option) && option === '2' || option === 'soigner') {
            this.heal();
            return;
        }
        if (battleGameOptionsArrLength > 2) {
            if (optionAnswerRange.test(option) && option === '3' || option === 'protéger' || option === 'proteger') {
                console.log('\nVous enclenchez votre \x1b[34mbouclier\x1b[0m la prochaine attaque de de sera pas aussi forte\n');
                return 'protect';
            }
            else if (optionAnswerRange.test(option) && option === '4' || option === 'fuire') {
                return 'escape';
            }
            else if (optionAnswerRange.test(option) && option === '5' || option === 'profil') {
                this.profil();
                (0, display_lib_1.displayPlayerBattleOptions)(battleGameOptionsArr);
                this.chooseBattleOptions(target, battleGameOptionsArr);
            }
        }
        else {
            console.error(`ERREUR ! Mauvaise input, veuillez recommencer`);
            this.chooseBattleOptions(target, battleGameOptionsArr);
        }
    }
    showExp() {
        const expBar = Array(this.exp).fill(' ').join('');
        const expBarMissing = Array(this.expMax - this.exp).fill(' ').join('');
        console.log(`\x1b[37mexp\x1b[0m : [ \x1b[40m${expBar}\x1b[0m\x1b[49m${expBarMissing}\x1b[0m ] ${this.exp}/${this.expMax}\n`);
    }
    showLevel() {
        console.log(`\x1b[37mlevel\x1b[0m : ${this.level}\n`);
    }
    showCoins() {
        console.log(`💰: ${this.coins}`);
    }
    showStats() {
        console.log(`\x1b[37mstr\x1b[0m : \x1b[37;1m${this.str}\x1b[0m | \x1b[37mdef\x1b[0m : \x1b[37;1m${this.def}\x1b[0m | \x1b[37mspd\x1b[0m : \x1b[37;1m${this.spd}\x1b[0m | \x1b[37mclass\x1b[0m : \x1b[37;1m${this.class}\x1b[0m | \x1b[37mrace\x1b[0m : \x1b[37;1m${this.race}\x1b[0m | \x1b[37mluck\x1b[0m : \x1b[37;1m${this.luck}\n\x1b[0m`);
    }
    showRace() {
        const racesData = (0, utils_1.readJsonFile)('/home/bervin_j/The_hyrule_castle/resources/races.json');
        const playerRaceData = racesData.find(race => race.id === this.race);
        if (playerRaceData) {
            console.log(`\x1b[37mRace :\x1b[0m ${playerRaceData.name}`);
            console.log(`\x1b[37mForce :\x1b[0m ${playerRaceData.strength.length === 0 ? '-' : playerRaceData.strength}`);
            console.log(`\x1b[37mFaiblesses :\x1b[0m ${playerRaceData.weakness.length === 0 ? '-' : playerRaceData.weakness}\n`);
        }
        else {
            console.error("Race non trouvée pour l'id:", this.race);
        }
    }
    showClass() {
        const classesData = (0, utils_1.readJsonFile)('/home/bervin_j/The_hyrule_castle/resources/classes.json');
        const playerClassData = classesData.find(classData => classData.id === this.class);
        if (playerClassData) {
            console.log(`\x1b[37mClass :\x1b[0m ${playerClassData.name}`);
            console.log(`\x1b[37mForce :\x1b[0m ${playerClassData.strengths.length === 0 ? '-' : playerClassData.strengths}`);
            console.log(`\x1b[37mFaiblesses :\x1b[0m ${playerClassData.weaknesses.length === 0 ? '-' : playerClassData.weaknesses}`);
            console.log(`\x1b[37mSpécialité :\x1b[0m ${playerClassData.attack_type}`);
            console.log(`\x1b[37mPosition :\x1b[0m ${playerClassData.alignment === 'good' ? playerClassData.alignment.concat(' 😇') : playerClassData.alignment.concat(' 😈')}`);
        }
        else {
            console.error("Class non trouvée pour l'id:", this.class);
        }
    }
}
exports.Player = Player;
