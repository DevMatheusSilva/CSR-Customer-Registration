import Entitie from "./Entitie";
import PhoneType from "./enums/PhoneType";

export default class Phone extends Entitie {
  ddd!: string;
  number!: string;
  type!: PhoneType;

  setDdd(ddd: string): void {
    const dddRegex: RegExp = /^\d{2}$/;
    if (!dddRegex.test(ddd)) {
      throw new Error(`Invalid DDD: ${ddd}`);
    }
    this.ddd = ddd;
  }

  setNumber(number: string): void {
    const numberRegex: RegExp = /^\d{8,9}$/;
    if (!numberRegex.test(number)){
      throw new Error(`Invalid phone number: ${number}`);
    }

    this.number = number;
  }

  setType(type: PhoneType): void {
    if (!Object.values(PhoneType).includes(type)){
      throw new Error(`Invalid phone type: ${type}`);
    }
    
    this.type = type;
  }
}