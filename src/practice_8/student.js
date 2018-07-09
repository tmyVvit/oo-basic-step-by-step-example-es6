"use strict";
const {Person} = require('./person');
const {Class} = require('./class');

class Student extends Person {
    constructor(id, name, age, classN) {
        super(id, name, age);
        this.classN = classN;
    }
    introduce(){
        let leaderOrNot = 'at';
        if(this.classN.leader !== undefined &&this.equal(this.classN.leader))
            leaderOrNot = 'Leader of';
        return super.introduce()+` I am a Student. I am `+leaderOrNot+` Class ${this.classN.number}.`;
    }
    equal(student) {
        return this.id===student.id;
    }
}

module.exports = {Student}


