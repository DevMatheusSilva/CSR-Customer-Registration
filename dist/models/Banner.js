"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entitie_1 = __importDefault(require("./Entitie"));
class Banner extends Entitie_1.default {
    setDescription(description) {
        this.description = description;
    }
}
exports.default = Banner;
