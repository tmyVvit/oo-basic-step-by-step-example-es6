"use strict";
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);

const {Person} = require("../../src/practice_11/person.js");
const {Student} = require("../../src/practice_11/student.js");
const {Teacher} = require("../../src/practice_11/teacher.js");
const {Class} = require("../../src/practice_11/class.js");

describe("#11 Person", () => {
    it("should have field name and age", () => {
        const person = new Person(1, "Tom", 21);
        expect(person.name).to.equal("Tom");
        expect(person.age).to.equal(21);
    });

    it("should have a method introduce, introduce person with name and age", () => {
        const person = new Person(1, "Tom", 21);
        const introduce = person.introduce();
        expect(introduce).to.equal("My name is Tom. I am 21 years old.");
    });

    describe("#11.1 Student", () => {
        let classN;

        before(() => {
            classN = new Class(2);
        });

        it("should have field name, age and class number", () => {
            const student = new Student(1, "Tom", 21, classN);
            expect(student.name).to.equal("Tom");
            expect(student.age).to.equal(21);
            expect(student.classN).to.equal(classN);
        });

        describe("#11.1.1 introduce", () => {
            it("should overwrite Person introduce, introduce with name, age and class number", () => {
                const student = new Student(1, "Tom", 21, classN);
                const introduce = student.introduce();

                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Student. I am at Class 2.");
            });

            it("should print Leader role, given student is leader", () => {
                const classN = new Class(2);
                const student = new Student(1, "Tom", 21, classN);

                classN.assignLeader(student);
                const introduce = student.introduce();

                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Student. I am Leader of Class 2.");
            });
        });
    });

    describe("#11.2 Teacher", () => {
        let classNes;
        let classN;

        before(() => {
            classN = new Class(2);
            classNes = [classN, new Class(3)];
        });

        it("should have field name, age and class number", () => {
            const teacher = new Teacher(1, "Tom", 21, classNes);
            expect(teacher.name).to.equal("Tom");
            expect(teacher.age).to.equal(21);
            expect(teacher.classes.length).to.equal(classNes.length);
            expect(teacher.classes[0]).to.equal(classNes[0]);
            expect(teacher.classes[1]).to.equal(classNes[1]);
        });

        describe("#11.2.1 introduce", () => {
            it("should overwrite Person introduce, introduce with name, age and class number, given teacher have class", () => {
                const teacher = new Teacher(1, "Tom", 21, classNes);
                const introduce = teacher.introduce();
                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Teacher. I teach Class 2, 3.");
            });

            it("should overwrite Person introduce, introduce with name, age and class number, given teacher have no class", () => {
                const teacher = new Teacher(1, "Tom", 21);
                const introduce = teacher.introduce();
                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Teacher. I teach No Class.");
            });
        });

        describe("#11.2.2 introduceWith", () => {
            let studentJerry;
            before(() => {
                studentJerry = new Student(1, "Jerry", 8, classN);
            });

            it("should return I am teaching some guy, given my class is same with this guy's class", () => {
                const teacher = new Teacher(1, "Tom", 21, classNes);
                const introduce = teacher.introduceWith(studentJerry);
                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Teacher. I teach Jerry.");
            });

            it("should return I am teaching some guy, given my class is different with this guy's class", () => {
                const teacher = new Teacher(1, "Tom", 21, [new Class(10)]);
                const introduce = teacher.introduceWith(studentJerry);
                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Teacher. I don't teach Jerry.");
            });
        });
    });
});

describe("#11 Class", () => {
    before(() => {
        sinon.spy(console, 'log');
    });

    after(() => {
        console.log.restore();
    });

    it("should have class number", () => {
        const classN = new Class(2);
        expect(classN.number).to.equal(2);
    });

    it("should get display name with number", () => {
        const classN = new Class(2);
        expect(classN.getDisplayName()).to.equal("Class 2");
    });

    describe("#11.3 assignLeader", () => {
        it("should assign student as Leader, given student is class member", () => {
            const classN = new Class(2);
            const student = new Student(1, "Jerry", 21, classN);

            classN.assignLeader(student);

            expect(classN.leader).to.equal(student);
         });

        it("should not assign student as Leader, given student is not class member", () => {
            const classN = new Class(2);
            const otherclassN = new Class(3);
            const student = new Student(1, "Jerry", 21, otherclassN);

            classN.assignLeader(student);

            expect(classN.leader).not.equal(student);
        });

        it("should not assign student as Leader, given student is not class member", () => {
            const classN = new Class(2);
            const otherclassN = new Class(3);
            const student = new Student(1, "Jerry", 21, otherclassN);

            classN.assignLeader(student);

            expect(classN.leader).not.equal(student);
            //expect(console.log.getCall(0).args[0]).to.equal("It is not one of us."); //assert style 2.
            expect(console.log).to.be.calledWith("It is not one of us.");
        });

        it("should notify assign leader listeners", () => {
            const classN = new Class(2);
            const otherclassN = new Class(3);
            const student = new Student(1, "Jerry", 21, classN);
            const teacher = new Teacher(1, "Tom", 21, [classN, otherclassN]);
            classN.registerAssignLeaderListener(teacher);

            classN.assignLeader(student);
            expect(console.log).to.be.calledWith("I am Tom. I know Jerry become Leader of Class 2.");

        });
    });

    describe("#11.4 appendMemeber", () => {
        it("should change student's classN attribute", () => {
            const classN = new Class(2);
            const otherclassN = new Class(3);

            const student = new Student(1, "Jerry", 21, otherclassN);

            expect(student.classN).to.equal(otherclassN);

            classN.appendMember(student);

            expect(student.classN).to.equal(classN);
        });

        it("should notify join listeners", () => {
            const classN = new Class(2);
            const otherclassN = new Class(3);
            const teacher = new Teacher(1, "Tom", 21, [classN, otherclassN]);

            const student = new Student(1, "Jerry", 21, otherclassN);
            classN.registerJoinListener(teacher);

            classN.appendMember(student);

            expect(console.log).to.be.calledWith("I am Tom. I know Jerry has joined Class 2.");

        });
    });
});