"use strict";

const {Person} = require('./person')

class Teacher extends Person {
    constructor(id, name, age, classN) {
        super(id, name, age);
        this.classN = classN;
    }
    basicIntroduce() {
        return super.introduce();
    }

    introduce(){
        let classString = '';
        if(this.classN !== undefined)
            classString += this.classN.getDisplayName();
        else classString += 'No Class';
        return this.basicIntroduce()+` I am a Teacher. I teach ${classString}.`;
    }

    introduceWith(student) {
        let teachOrNot = ' don\'t';
        if(this.classN.equal(student.classN))
            teachOrNot = '';
        return super.introduce()+ ` I am a Teacher. I`+teachOrNot+` teach ${student.name}.`;
    }

}
module.exports = {Teacher};