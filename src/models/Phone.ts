import Entitie from "./Entitie";
import PhoneType from "./enums/PhoneType";

export default class Phone extends Entitie {
  ddd!: string;
  number!: string;
  type!: PhoneType;

  validateDdd(ddd: string): boolean {
    const dddRegex: RegExp = /^\d{2}$/;
    return dddRegex.test(ddd);
  }

  validateNumber(number: string): boolean {
    const numberRegex: RegExp = /^\d{8,9}$/;
    return numberRegex.test(number);
  }

  validateType(type: PhoneType): boolean {
    return Object.values(PhoneType).includes(type);
  }

  setDdd(ddd: string): void {
    this.ddd = ddd;
  }

  setNumber(number: string): void {
    this.number = number;
  }

  setType(type: PhoneType): void {
    this.type = type;
  }
}