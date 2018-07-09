"use strict";
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);

const {Person} = require("../../src/practice_9/person.js");
const {Student} = require("../../src/practice_9/student.js");
const {Teacher} = require("../../src/practice_9/teacher.js");
const {Class} = require("../../src/practice_9/class.js");


describe("#9 Person", () => {
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

    describe("#9.1 Student", () => {
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

        describe("#9.2 introduce", () => {
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

    describe("#9 Teacher", () => {
        let classN;

        before(() => {
            classN = new Class(2);
        });

        it("should have field name, age and class number", () => {
            const teacher = new Teacher(1, "Tom", 21, classN);
            expect(teacher.name).to.equal("Tom");
            expect(teacher.age).to.equal(21);
            expect(teacher.classN).to.equal(classN);
        });

        describe("#9.3 introduce", () => {
            it("should overwrite Person introduce, introduce with name, age and class number, given teacher have class", () => {
                const teacher = new Teacher(1, "Tom", 21, classN);
                const introduce = teacher.introduce();
                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Teacher. I teach Class 2.");
            });

            it("should overwrite Person introduce, introduce with name, age and class number, given teacher have no class", () => {
                const teacher = new Teacher(1, "Tom", 21);
                const introduce = teacher.introduce();

                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Teacher. I teach No Class.");
            });
        });
        
        describe("#9.4 introduceWith", () => {
            let studentJerry;

            before(() => {
                studentJerry = new Student(1, "Jerry", 8, classN);
            });

            it("should return I am teaching some guy, given my class is same with this guy's class", () => {
                const teacher = new Teacher(1, "Tom", 21, classN);
                const introduce = teacher.introduceWith(studentJerry);
                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Teacher. I teach Jerry.");
            });

            it("should return I am teaching some guy, given my class is different with this guy's class", () => {
                const teacher = new Teacher(1, "Tom", 21, new Class(10));
                const introduce = teacher.introduceWith(studentJerry);
                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Teacher. I don't teach Jerry.");
            });
        });
    });
});

describe("#9 Class", () => {
    it("should have class number", () => {
        const classN = new Class(2);
        expect(classN.number).to.equal(2);
    });

    it("should get display name with number", () => {
        const classN = new Class(2);
        expect(classN.getDisplayName()).to.equal("Class 2");
    });

    describe("#9.5 assignLeader", () => {


        before(()=>{
            sinon.spy(console, 'log');
        });

        after(() => {
            console.log.restore();
        });


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
    });

    describe("#9.6 appendMemeber", () => {
        it("should change student's classN attribute", () => {
            const classN = new Class(2);
            const otherclassN = new Class(3);

            const student = new Student(1, "Jerry", 21, otherclassN);

            expect(student.classN).to.equal(otherclassN);

            classN.appendMember(student);

            expect(student.classN).to.equal(classN);
        });
    });
});