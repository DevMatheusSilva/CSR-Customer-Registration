import Entitie from "./Entitie";

export default class Banner extends Entitie {
  description: string;

  constructor(description: string) {
    super();
    this.description = description;
  }

  setDescription(description: string): void {
    this.description = description;
  }
}