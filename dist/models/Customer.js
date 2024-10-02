"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
const Gender_1 = __importDefault(require("./enums/Gender"));
class Customer extends User_1.default {
    constructor() {
        super(...arguments);
        this.cards = [];
        this.addresses = [];
        this.phones = [];
    }
    setName(name) {
        if (!name) {
            throw new Error(`Name cannot be null`);
        }
        this.name = name;
    }
    setBirthDate(birthDate) {
        const birthDateFormatted = new Date(birthDate);
        if (isNaN(birthDateFormatted.getTime()) || birthDateFormatted > new Date()) {
            throw new Error(`Invalid birth date: ${birthDate}`);
        }
        this.birthDate = birthDateFormatted;
    }
    setGender(gender) {
        if (!Object.values(Gender_1.default).includes(gender)) {
            throw new Error(`Invalid gender: ${gender}`);
        }
        this.gender = gender;
    }
    setCpf(cpf) {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!cpfRegex.test(cpf)) {
            throw new Error(`Invalid CPF: ${cpf}`);
        }
        this.cpf = cpf;
    }
    setOneCard(card) {
        this.cards.push(card);
    }
    setOneAddress(address) {
        this.addresses.push(address);
    }
    setOnePhone(phone) {
        this.phones.push(phone);
    }
    setRanking(ranking) {
        this.ranking = ranking;
    }
}
exports.default = Customer;
