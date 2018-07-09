"use strict";

class Class {
    constructor(number) {
        this.number = number;
    }
    getDisplayName() {
        return `Class ${this.number}`;
    }

    equal(classN) {
        return this.number === classN.number;
    }

    isIn(student) {
        return student.classN === this;
    }
    assignLeader(student) {
        if(this.equal(student.classN)){
            Class.prototype.leader = student;
            if(this.leaderListener !== undefined)
                this.leaderListener.find(teacher=>teacher.classes.find(classN=>classN.isIn(student))).updateLeader(student);
        }
        else console.log('It is not one of us.');
    }

    appendMember(student) {
        student.classN = this;
        if(this.joinListener !== undefined)
            this.joinListener.find(teacher=>teacher.classes.find(classN=>classN.isIn(student))).updateJoin(student);
    }

    registerAssignLeaderListener(teacher) {
        Class.prototype.leaderListener = [];
        Class.prototype.leaderListener.push(teacher);
    }
    registerJoinListener(teacher) {
        Class.prototype.joinListener = [];
        Class.prototype.joinListener.push(teacher);
    }

}

module.exports = {Class}
