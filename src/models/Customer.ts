import Address from "./Address";
import Phone from "./Phone";
import Card from "./Card";
import User from "./User";
import Gender from "./enums/Gender";

export default class Customer extends User {
  name!: string;
  birthDate!: Date;
  gender!: Gender;
  cpf!: string;
  cards: Card[] = [];
  addresses: Address[] = [];
  phones: Phone[] = [];
  ranking!: number;

  setName(name: string): void {
    this.name = name;
  }

  setBirthDate(birthDate: string): void {
    const birthDateFormatted: Date = new Date(birthDate);
    this.birthDate = birthDateFormatted;
  }

  setGender(gender: Gender): void {
    this.gender = gender;
  }

  setCpf(cpf: string): void {
    const cpfRegex: RegExp = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
    if (!cpfRegex.test(cpf)) {
      throw new Error(`Invalid CPF: ${cpf}`);
    }
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