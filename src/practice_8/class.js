"use strict";
class Class {
    constructor(number) {
        this.number = number;
    }

    getDisplayName() {
        return `Class ${this.number}`;
    }

    assignLeader(student) {
        if(this.equal(student.classN))
            Class.prototype.leader = student;
    }
    equal(classN){
        return classN.number === this.number;
    }
}


module.exports = {Class};
