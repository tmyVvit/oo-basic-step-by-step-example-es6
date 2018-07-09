"use strict";
const {Person} = require('./person');
const {Class} = require('./class');
class Teacher extends Person {
    constructor(id, name, age, classN) {
        super(id, name, age);
        this.classN = classN;
    }

    introduce(){
        if(this.classN !== undefined)
            return super.introduce()+` I am a Teacher. I teach `+`${this.classN.getDisplayName()}`+'.';
        else return super.introduce()+` I am a Teacher. I teach No Class.`;
    }

}

module.exports = {Teacher}

