import { v4 as uuidv4 } from 'uuid';

export default abstract class Entitie {
  id: string;
  isActive: boolean;

  constructor() {
    this.id = uuidv4();
    this.isActive = true;
  }
}