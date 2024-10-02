import Entitie from "./Entitie";

export default class Country extends Entitie {
  name!: string;
  abbreviation!: string; 

  setName(name: string): void {
    this.name = name;
  }

  setAbbreviation(abbreviation: string): void {
    const abbrRegex: RegExp = /^[A-Z]{2}$/;
    if(!abbrRegex.test(abbreviation)) {
      throw new Error(`Invalid abbreviation: ${abbreviation}`);
    }

    this.abbreviation = abbreviation;
  }
}