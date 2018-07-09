"use strict";

const {Person} = require('./person');

class Teacher extends Person {
    constructor(id, name, age, classes) {
        super(id, name, age);
        this.classes = classes;
    }

    getClassString() {
        let classString = 'No Class';
        if(this.classes!== undefined &&this.classes.length > 0)
            classString = `Class ${this.classes.map(classN=>classN.number).join(', ')}`;
        return classString;
    }

    introduce() {
        return super.introduce()+` I am a Teacher. I teach ${this.getClassString()}.`;
    }

    isTeaching(student) {
        return this.classes.find(classN=>classN.isIn(student))!==undefined;
    }

    introduceWith(student) {
        return super.introduce()+` I am a Teacher. I `+(this.isTeaching(student)?'':'don\'t ')+`teach ${student.name}.`;
    }
}

module.exports = {Teacher}
