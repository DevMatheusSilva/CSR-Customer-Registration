import Entitie from "./Entitie";
import PhoneType from "./enums/PhoneType";

export default class Phone extends Entitie {
  ddd!: string;
  number!: string;
  type!: PhoneType;

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