import Address from "./Address";
import Phone from "./Phone";
import Card from "./Card";
import User from "./User";
import Gender from "./enums/Gender";

export default class Customer extends User {
  private customersList = new Array<Customer>();

  name!: string;
  birthDate!: Date;
  gender!: Gender;
  cpf!: string;
  cards: Card[] = [];
  addresses: Address[] = [];
  phones: Phone[] = [];
  ranking!: number;
  
  save(customer: Customer): string {
    this.customersList.push(customer);
    return "Customer created successfully";
  }

  validate(): boolean {
    const today = new Date();
    if (this.birthDate >= today) {
      return false;
    }

    if (this.cards.length === 0) {
      return false;
    }

    if (this.addresses.length === 0) {
      return false;
    }

    for (const address of this.addresses) {
      if (!address.validate()) {
        return false;
      }
    }

    for (const card of this.cards) {
      if (!card.validate()) {
        return false;
      }
    }

    for (const phone of this.phones) {
      if (!phone.validate()) {
        return false;
      }
    }
    
    return true;
  } 

  setName(name: string): void {
    this.name = name;
  }

  setBirthDate(birthDate: Date): void {
    this.birthDate = birthDate;
  }

  setGender(gender: Gender): void {
    this.gender = gender;
  }

  setCpf(cpf: string): void {
    this.cpf = cpf;
  }

  setOneCard(card: Card): void {
    this.cards.push(card);
  }

  setOneAddress(address: Address): void {
    this.addresses.push(address);
  }

  setOnePhone(phone: Phone): void {
    this.phones.push(phone);
  }

  setRanking(ranking: number): void {
    this.ranking = ranking;
  }
}