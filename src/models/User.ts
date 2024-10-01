import Entitie from "./Entitie";

export default class User extends Entitie {
  email!: string;
  password!: string;

  setEmail(email: string): void {
    this.email = email;
  }

  setPassword(passwordFirst: string, passwordSecond: string): void {
    const passwordRegex: RegExp = /^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*])(?=.{8,})/
    if (passwordFirst !== passwordSecond) {
      throw new Error("Passwords do not match");
    }
    if (!passwordRegex.test(passwordFirst)) {
      throw new Error("Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character");
    }
    this.password = passwordFirst;
  }
}