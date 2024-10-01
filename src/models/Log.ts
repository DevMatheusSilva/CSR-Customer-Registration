import Entitie from "./Entitie";
import User from "./User";

export default class Log extends Entitie {
  dateAndHour: Date;
  user: User;

  constructor(dateAndHour: Date, user: User) {
    super();
    this.dateAndHour = dateAndHour;
    this.user = user;
  }

  setDateAndHour(dateAndHour: Date): void {
    this.dateAndHour = dateAndHour;
  }

  setUser(user: User): void {
    this.user = user;
  }
}