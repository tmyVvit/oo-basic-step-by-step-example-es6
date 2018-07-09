"use strict";
const {Person} = require('./person');

class Student extends Person {
    constructor(name, age, classN) {
        super(name, age);
        this.classN = classN;
    }
    introduce(){
        return `I am a Student. I am at Class ${this.classN}.`;
    }
}

module.exports = {Student}