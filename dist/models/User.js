"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entitie_1 = __importDefault(require("./Entitie"));
class User extends Entitie_1.default {
    setEmail(email) {
        if (!email || !email.includes("@")) {
            throw new Error(`Invalid email: ${email}`);
        }
        this.email = email;
    }
    setPassword(password) {
        const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*])(?=.{8,20})/;
        if (!password) {
            throw new Error('Password cannot be null');
        }
        if (password.length < 8) {
            throw new Error('Password must have at least 8 characters');
        }
        console.log(password);
        console.log(passwordRegex.test(password));
        if (!passwordRegex.test(password)) {
            throw new Error('Invalid regex for password');
        }
        this.password = password;
    }
}
exports.default = User;
