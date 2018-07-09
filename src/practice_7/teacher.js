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
            return super.introduce()+` I am a Teacher. I teach `+`${this.classN.getDisplayName()}`+'.';
        else return super.introduce()+` I am a Teacher. I teach No Class.`;
    }

    introduceWith(student) {
        let tmp = '';
        if(student.classN.number !== this.classN.number)
            tmp = "don't ";
        return super.introduce()+` I am a Teacher. I `+tmp+`teach ${student.name}.`;
    }
}

module.exports = {Teacher}

