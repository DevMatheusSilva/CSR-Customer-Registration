import Address from "./Address";
import Phone from "./Phone";
import Card from "./Card";
import User from "./User";
import Genre from "./enums/Gender";

export default class Customer extends User {
  name: string;
  birthDate: Date;
  genre: Genre;
  cpf: string;
  cards: Card[];
  addresses: Address[];
  phones: Phone[];
  ranking: number;

  constructor(
    email: string, 
    password: string, 
    name: string, 
    birthDate: Date, 
    genre: Genre, 
    cpf: string, 
    cards: Card[], 
    addresses: Address[],
    phones: Phone[],
    ranking: number
  ) {
    super(email, password);
    this.name = name;
    this.birthDate = birthDate;
    this.genre = genre;
    this.cpf = cpf;
    this.cards = cards;
    this.addresses = addresses;
    this.phones = phones;
    this.ranking = ranking;
  }

  setName(name: string): void {
    this.name = name;
  }

  setBirthDate(birthDate: Date): void {
    this.birthDate = birthDate;
  }

  setGenre(genre: Genre): void {
    this.genre = genre;
  }

  setCpf(cpf: string): void {
    this.cpf = cpf;
  }

  setOneCard(card: Card): void {
    this.cards.push(card);
  }

  setAddresses(addresses: Address[]): void {
    this.addresses = addresses;
  }

  setOnePhone(phone: Phone): void {
    this.phones.push(phone);
  }

  setRanking(ranking: number): void {
    this.ranking = ranking;
  }
}