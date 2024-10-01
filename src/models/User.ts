import Entitie from "./Entitie";

export default class User extends Entitie {
  email!: string;
  password!: string;

  setEmail(email: string): void {
    this.email = email;
  }

  setPassword(password: string): void {
    this.password = password;
  }
}