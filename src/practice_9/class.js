"use strice"

class Class {
    constructor(number) {
        this.number = number;
    }

    equal(classN){
        return this.number === classN.number;
    }

    assignLeader(student) {
        if(this.equal(student.classN))
            Class.prototype.leader = student;
        else console.log(`It is not one of us.`);
    }

    getDisplayName() {
        return `Class ${this.number}`;
    }

    appendMember(student) {
        student.classN = this;
    }
}
module.exports = {Class};