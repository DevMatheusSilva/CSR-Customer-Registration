import Entitie from "./Entitie";

export default class Country extends Entitie {
  name!: string;
  abbreviation!: string;
  
  validateAbbr(abbreviation: string): boolean {
    return abbreviation.length === 2;
  } 

  setName(name: string): void {
    this.name = name;
  }

  setAbbreviation(abbreviation: string): void {
    this.abbreviation = abbreviation;
  }
}