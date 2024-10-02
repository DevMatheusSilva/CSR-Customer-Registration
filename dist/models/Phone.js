"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entitie_1 = __importDefault(require("./Entitie"));
const PhoneType_1 = __importDefault(require("./enums/PhoneType"));
class Phone extends Entitie_1.default {
    setDdd(ddd) {
        const dddRegex = /^\d{2}$/;
        if (!dddRegex.test(ddd)) {
            throw new Error(`Invalid DDD: ${ddd}`);
        }
        this.ddd = ddd;
    }
    setNumber(number) {
        const numberRegex = /^\d{8,9}$/;
        if (!numberRegex.test(number)) {
            throw new Error(`Invalid phone number: ${number}`);
        }
        this.number = number;
    }
    setType(type) {
        if (!Object.values(PhoneType_1.default).includes(type)) {
            throw new Error(`Invalid phone type: ${type}`);
        }
        this.type = type;
    }
}
exports.default = Phone;
