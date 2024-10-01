import Banner from "./Banner";
import Entitie from "./Entitie";

export default class Card extends Entitie {
  number!: string;
  printedName!: string;
  cvv!: string;
  isPreferential!: boolean;
  banner!: Banner;

  validateCardNumber(cardNumber: string): boolean {
    const cardNumberRegex: RegExp = /^(?:\d[ -]*?){13,16}$/;
    return cardNumberRegex.test(cardNumber);
  }

  validateCardCvv(cvv: string): boolean {
    const cardCvvRegex: RegExp = /^\d{3,4}$/;
    return cardCvvRegex.test(cvv);
  }

  setNumber(number: string): void {
    this.number = number;
  }

  setPrintedName(printedName: string): void {
    this.printedName = printedName;
  }

  setCvv(cvv: string): void {
    this.cvv = cvv;
  }

  setIsPreferential(isPreferential: boolean): void {
    this.isPreferential = isPreferential;
  }

  setBanner(banner: Banner): void {
    this.banner = banner;
  }
}