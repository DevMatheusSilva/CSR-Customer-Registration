"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entitie_1 = __importDefault(require("./Entitie"));
class Log extends Entitie_1.default {
    setDateAndHour(dateAndHour) {
        this.dateAndHour = dateAndHour;
    }
    setUser(user) {
        this.user = user;
    }
}
exports.default = Log;
