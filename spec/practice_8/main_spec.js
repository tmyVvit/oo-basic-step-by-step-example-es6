"use strict";
import _ from "lodash";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
const expect = chai.expect;
chai.use(sinonChai);

import Person from "../../src/practice_8/person.js";
import Student from "../../src/practice_8/student.js";
import Teacher from "../../src/practice_8/teacher.js";
import Class from "../../src/practice_8/class.js";

describe("#8 Person", () => {
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

    describe("Student", () => {
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

        describe("#introduce", () => {
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

    describe("Teacher", () => {
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

        describe("#introduce", () => {
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
    });
});

describe("Class", () => {
    it("should have class number", () => {
        const classN = new Class(2);
        expect(classN.number).to.equal(2);
    });

    it("should get display name with number", () => {
        const classN = new Class(2);
        expect(classN.getDisplayName()).to.equal("Class 2");
    });

    describe("#assignLeader", () => {
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
    });
});
