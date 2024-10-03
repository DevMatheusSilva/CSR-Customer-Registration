import Entitie from "./Entitie";
import PhoneType from "./enums/PhoneType";

export default class Phone extends Entitie {
  ddd!: string;
  number!: string;
  type!: PhoneType;

  setDdd(ddd: string): void {
    if (ddd.trim().length !== 2) {
      throw new Error(`Invalid DDD: ${ddd}`);
    }
    this.ddd = ddd;
  }

  setNumber(number: string): void {
    const numberRegex: RegExp = /^\d{4}-\d{4}$|^\d{5}-\d{4}$/;
    if (!numberRegex.test(number)){
      throw new Error(`Invalid phone number: ${number}`);
    }
    this.number = number;
  }

  setType(type: PhoneType): void {
    this.type = type;
  }
}