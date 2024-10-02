"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entitie_1 = __importDefault(require("./Entitie"));
class Card extends Entitie_1.default {
    setNumber(number) {
        const cardNumberRegex = /^(?:\d[ -]*?){13,16}$/;
        if (!cardNumberRegex.test(number)) {
            throw new Error(`Invalid card number: ${number}`);
        }
        this.number = number;
    }
    setPrintedName(printedName) {
        this.printedName = printedName;
    }
    setCvv(cvv) {
        const cardCvvRegex = /^\d{3,4}$/;
        if (!cardCvvRegex.test(cvv)) {
            throw new Error(`Invalid CVV: ${cvv}`);
        }
        this.cvv = cvv;
    }
    setIsPreferential(isPreferential) {
        this.isPreferential = isPreferential;
    }
    setBanner(banner) {
        this.banner = banner;
    }
}
exports.default = Card;
