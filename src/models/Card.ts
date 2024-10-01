import Banner from "./Banner";
import Entitie from "./Entitie";

export default class Card extends Entitie {
  number: string;
  printedName: string;
  cvv: string;
  isPreferential: boolean;
  banner: Banner;

  constructor(number: string, printedName: string, cvv: string, isPreferential: boolean, banner: Banner) {
    super();
    this.number = number;
    this.printedName = printedName;
    this.cvv = cvv;
    this.isPreferential = isPreferential;
    this.banner = banner;
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