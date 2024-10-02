import Entitie from "./Entitie";

export default class User extends Entitie {
  email!: string;
  password!: string;

  setEmail(email: string): void {
    if (!email || !email.includes("@")) {
      throw new Error(`Invalid email: ${email}`);
    }
    this.email = email;
  }

  setPassword(password: string): void {
    const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}$/;

    if (!password) {
      throw new Error('Password cannot be null');
    }

    if (password.length < 8) {
      throw new Error('Password must have at least 8 characters');
    }

    if (!passwordRegex.test(password)) {
      throw new Error('Invalid regex for password');
    }

    this.password = password;
  }  
}