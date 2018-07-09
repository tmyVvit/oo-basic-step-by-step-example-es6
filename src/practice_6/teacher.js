"use strict";
const {Person} = require('./person');

class Teacher extends Person {
    constructor(name, age, classN) {
        super(name, age);
        this.classN = classN;
    }

    introduce(){
        if(this.classN!==null && this.classN !== undefined)
            return super.introduce()+` I am a Teacher. I teach Class ${this.classN}.`;
        else return super.introduce()+` I am a Teacher. I teach No Class.`;
    }
}

module.exports = {Teacher}
