"use strict";
const {Person} = require('./person');
const {Class} = require('./class');
class Teacher extends Person {
    constructor(name, age, classN) {
        super(name, age);
        this.classN = classN;
    }

    introduce(){
        if(this.classN!==null && this.classN !== undefined)
            return super.introduce()+` I am a Teacher. I teach Class ${this.classN.number}.`;
        else return super.introduce()+` I am a Teacher. I teach No Class.`;
    }

    introduceWith(student) {
        if(student.classN.number === this.classN.number)
            return super.introduce()+` I am a Teacher. I `+(student.classN.number === this.classN.number)?'':'don\'t'+`teach ${student.name}.`;
    }
}

module.exports = {Teacher}

