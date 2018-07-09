"use strict";
class Class {
    constructor(number) {
        this.number = number;
    }

    getDisplayName() {
        return `Class ${this.number}`;
    }

    assignLeader(student) {
        Class.prototype.leader = student;
    }
}


module.exports = {Class};
