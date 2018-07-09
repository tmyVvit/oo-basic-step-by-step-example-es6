"use strict";
import chai from "chai";
import sinonChai from "sinon-chai";
const expect = chai.expect;
chai.use(sinonChai);

import {Person} from "../../src/practice_7/person.js";
import {Student} from "../../src/practice_7/student.js";
import {Teacher} from "../../src/practice_7/teacher.js";
import {Class} from "../../src/practice_7/class.js";

describe("#7 Person", () => {
    it("should have field name and age", () => {
        const person = new Person("Tom", 21);
        expect(person.name).to.equal("Tom");
        expect(person.age).to.equal(21);
    });

    it("should have a method introduce, introduce person with name and age", () => {
        const person = new Person("Tom", 21);
        const introduce = person.introduce();
        expect(introduce).to.equal("My name is Tom. I am 21 years old.");
    });

    describe("#7.1 Student", () => {
        let classN;

        before(() => {
           classN = new Class(2); 
        });

        it("should have field name, age and class number", () => {
            const student = new Student("Tom", 21, classN);
            expect(student.name).to.equal("Tom");
            expect(student.age).to.equal(21);
            expect(student.classN).to.equal(classN);
        });

        it("should overwrite Person introduce, introduce with name, age and class number", () => {
            const student = new Student("Tom", 21, classN);
            const introduce = student.introduce();
            expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Student. I am at Class 2.");
        });
    });

    describe("#7.2 Teacher", () => {
        let classN;

        before(() => {
            classN = new Class(2);
        });

        it("should have field name, age and class number", () => {
            const teacher = new Teacher("Tom", 21, classN);
            expect(teacher.name).to.equal("Tom");
            expect(teacher.age).to.equal(21);
            expect(teacher.classN).to.equal(classN);
        });

        describe("#7.2.1 introduce", () => {
            it("should overwrite Person introduce, introduce with name, age and class number, given teacher have class", () => {
                const teacher = new Teacher("Tom", 21, classN);
                const introduce = teacher.introduce();
                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Teacher. I teach Class 2.");
            });

            it("should overwrite Person introduce, introduce with name, age and class number, given teacher have no class", () => {
                const teacher = new Teacher("Tom", 21);
                const introduce = teacher.introduce();
                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Teacher. I teach No Class.");
            });
        });

        describe("#7.2.2 introduceWith", () => {
            let studentJerry;

            before(() => {
                studentJerry = new Student("Jerry", 8, classN);
            });

            it("should return I am teaching some guy, given my class is same with this guy's class", () => {
                const teacher = new Teacher("Tom", 21, classN);
                const introduce = teacher.introduceWith(studentJerry);
                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Teacher. I teach Jerry.");
            });

            it("should return I am teaching some guy, given my class is different with this guy's class", () => {
                const teacher = new Teacher("Tom", 21, new Class(10));
                const introduce = teacher.introduceWith(studentJerry);
                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Teacher. I don't teach Jerry.");
            });
        });
    });
});

describe("#7  Class", () => {
    it("should have class number", () => {
        const classN = new Class(2);
        expect(classN.number).to.equal(2);
    });

    it("should get display name with number", () => {
        const classN = new Class(2);
        expect(classN.getDisplayName()).to.equal("Class 2");
    });
});
