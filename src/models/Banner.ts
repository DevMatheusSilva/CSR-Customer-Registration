import Entitie from "./Entitie";

export default class Banner extends Entitie {
  description!: string;

  setDescription(description: string): void {
    this.description = description;
  }
}