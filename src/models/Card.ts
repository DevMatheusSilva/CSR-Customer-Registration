import Banner from "./Banner";
import Entitie from "./Entitie";

export default class Card extends Entitie {
  number!: string;
  printedName!: string;
  cvv!: string;
  isPreferential!: boolean;
  banner!: Banner;

  setNumber(number: string): void {
    const cardNumberRegex: RegExp = /^(?:\d[ -]*?){13,16}$/;
    if (!cardNumberRegex.test(number)) {
      throw new Error(`Invalid card number: ${number}`);
    }
    
    this.number = number;
  }

  setPrintedName(printedName: string): void {
    this.printedName = printedName;
  }

  setCvv(cvv: string): void {
    const cardCvvRegex: RegExp = /^\d{3,4}$/;
    if (!cardCvvRegex.test(cvv)) {
      throw new Error(`Invalid CVV: ${cvv}`);
    }

    this.cvv = cvv;
  }

  setIsPreferential(isPreferential: boolean): void {
    this.isPreferential = isPreferential;
  }

  setBanner(banner: Banner): void {
    this.banner = banner;
  }
}