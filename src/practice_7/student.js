"use strict";
const {Person} = require('./person');
const {Class} = require('./class');

class Student extends Person {
    constructor(name, age, classN) {
        super(name, age);
        this.classN = classN;
    }
    introduce(){
        return super.introduce()+` I am a Student. I am at Class ${this.classN.number}.`;
    }
}

module.exports = {Student}

