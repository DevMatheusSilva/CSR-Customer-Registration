import Country from "./Country";
import Entitie from "./Entitie";
import AddressType from "./enums/AddressType";

export default class Address extends Entitie {
  cep!: string;
  number!: string;
  complement!: string;
  publicPlace!: string;
  publicPlaceType!: string;
  neighborhood!: string;
  observation!: string;
  city!: string;
  state!: string;
  country!: Country;
  type!: AddressType;

  validate(): boolean {
    return true;
  }

  setCep(cep: string): void {
    this.cep = cep;
  }

  setNumber(number: string): void {
    this.number = number;
  }

  setComplement(complement: string): void {
    this.complement = complement;
  }

  setPublicPlace(publicPlace: string): void {
    this.publicPlace = publicPlace;
  }

  setPublicPlaceType(publicPlaceType: string): void {
    this.publicPlaceType = publicPlaceType;
  }

  setNeighborhood(neighborhood: string): void {
    this.neighborhood = neighborhood;
  }

  setObservation(observation: string): void {
    this.observation = observation;
  }

  setCity(city: string): void {
    this.city = city;
  }

  setState(state: string): void {
    this.state = state;
  }

  setCountry(country: Country): void {
    this.country = country;
  }

  setType(type: AddressType): void {
    this.type = type;
  }
}