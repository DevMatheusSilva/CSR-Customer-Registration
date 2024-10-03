import { v4 as uuidv4 } from 'uuid';

export default abstract class Entidade {
  id!: string;
  estaAtivo!: boolean;

  constructor() {
    this.id = uuidv4();
    this.estaAtivo = true;
  }
}