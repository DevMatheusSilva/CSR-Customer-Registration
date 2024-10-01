import Entitie from "./Entitie";

export default class User extends Entitie {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPassword(password: string): void {
    this.password = password;
  }
}