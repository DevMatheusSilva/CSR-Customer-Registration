"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entitie_1 = __importDefault(require("./Entitie"));
class Country extends Entitie_1.default {
    setName(name) {
        this.name = name;
    }
    setAbbreviation(abbreviation) {
        const abbrRegex = /^[A-Z]{2}$/;
        if (!abbrRegex.test(abbreviation)) {
            throw new Error(`Invalid abbreviation: ${abbreviation}`);
        }
        this.abbreviation = abbreviation;
    }
}
exports.default = Country;
