import Entitie from "./Entitie";

export default class Country extends Entitie {
  name: string;
  abbreviation: string;
  
  constructor(name: string, abbreviation: string) {
    super();
    this.name = name;
    this.abbreviation = abbreviation;
  }

  setName(name: string): void {
    this.name = name;
  }

  setAbbreviation(abbreviation: string): void {
    this.abbreviation = abbreviation;
  }
}