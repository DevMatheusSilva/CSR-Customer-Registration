import Entitie from "./Entitie";
import { genSaltSync, hashSync } from "bcrypt";

export default class User extends Entitie {
  email!: string;
  password!: string;

  setEmail(email: string): void {
    this.email = email;
  }

  setPassword(password: string): void {
    const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}$/;

    if (!passwordRegex.test(password)) {
      throw new Error('Password must be 8-20 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.');
    }
  
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
  
    this.password = hashedPassword;
  }
}    