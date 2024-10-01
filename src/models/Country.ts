import Entitie from "./Entitie";

export default class Country extends Entitie {
  name!: string;
  abbreviation!: string;
  
  setName(name: string): void {
    this.name = name;
  }

  setAbbreviation(abbreviation: string): void {
    this.abbreviation = abbreviation;
  }
}