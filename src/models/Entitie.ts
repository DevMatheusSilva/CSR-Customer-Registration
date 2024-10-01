import { v4 as uuidv4 } from 'uuid';

export default abstract class Entitie {
  id!: string;
  isActive!: boolean;

  setId(id: string): void {
    this.id = id;
  }

  setIsActive(isActive: boolean): void {
    this.isActive = isActive;
  }
}