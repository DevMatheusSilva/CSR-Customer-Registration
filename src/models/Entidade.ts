import { randomUUID } from "crypto";

export default abstract class Entidade {
  id!: string;
  estaAtivo!: boolean;

  constructor() {
    this.id = randomUUID();
    this.estaAtivo = true;
  }
}