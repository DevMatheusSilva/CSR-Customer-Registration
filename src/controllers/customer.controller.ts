import express from "express";
import Gender from "../models/enums/Gender";
import Country from "../models/Country";
import Address from "../models/Address";
import AddressType from "../models/enums/AddressType";
import Card from "../models/Card";
import Banner from "../models/Banner";
import Phone from "../models/Phone";
import PhoneType from "../models/enums/PhoneType";
import Customer from "../models/Customer";

export default class CustomerController {
  constructor(app: express.Application) {
    this.initializeRoutes(app);
  };

  private initializeRoutes(app: express.Application): void {
    app.get("/", (_, res) => {
      this.renderHomePage(_, res);
    });
  
    app.get("/customers", (_, res) => {
      this.renderCustomersForm(_, res);
    });

    app.post("/customers", (req, res) => {
      this.createCustomer(req, res);
    });
  }

  private renderHomePage(_: express.Request, res: express.Response): void {
    res.status(200).render("home");
  }

  private renderCustomersForm(_: express.Request, res: express.Response): void {
    res.status(200).render("customers");
  }

  private createCustomer(req: express.Request, res: express.Response): void {
    const address: Address = this.createAddress(req);
    const card: Card = this.createCard(req);
    const phone: Phone = this.createPhone(req);
    const gender: Gender = req.body.gender;
    const name: string = req.body.name;
    const birthDate: Date = req.body.birthDate;
    const cpf: string = req.body.cpf;
    const email: string = req.body.email;
    const passwordFirst: string = req.body.passwordFirst;
    const passwordSecond: string = req.body.passwordSecond;
    if (passwordFirst !== passwordSecond) {
      res.status(400).send("Passwords do not match");
    }
    
    const customer: Customer = this.defineCustomer(
      address, 
      card, 
      phone, 
      gender, 
      name, 
      birthDate, 
      cpf, 
      email, 
      passwordFirst
    );

    if (!customer.validate()) {
      res.status(400).send("Invalid customer data");
    }
    
    res.status(201).json(customer.save(customer));
  } 

  private defineCustomer(
    address: Address, 
    card: Card, 
    phone: Phone, 
    gender: Gender, 
    name: string, 
    birthDate: Date, 
    cpf: string, 
    email: string, 
    password: string
  ): Customer {
    const customer: Customer = new Customer();
    customer.setOneAddress(address);
    customer.setOneCard(card);
    customer.setOnePhone(phone);
    customer.setGender(gender);
    customer.setName(name);
    customer.setBirthDate(birthDate);
    customer.setCpf(cpf);
    customer.setEmail(email);
    customer.setPassword(password);
    return customer;
  }

  private createAddress(req: express.Request): Address {
    const cep: string = req.body.cep;
    const number: string = req.body.number;
    const complement: string = req.body.complement;
    const publicPlace: string = req.body.publicPlace;
    const publicPlaceType: string = req.body.publicPlaceType;
    const neighborhood: string = req.body.neighborhood;
    const observation: string = req.body.observation;
    const city: string = req.body.city;
    const state: string = req.body.state;
    const country: Country = this.createCountry(req);
    const type: AddressType = req.body.addressType;
    return this.defineAddress(
      cep, 
      number, 
      complement, 
      publicPlace, 
      publicPlaceType, 
      neighborhood, 
      observation, 
      city, 
      state, 
      country, 
      type
    );
  }
  
  private defineAddress(
    cep: string, 
    number: string, 
    complement: string, 
    publicPlace: string, 
    publicPlaceType: string, 
    neighborhood: string, 
    observation: string, 
    city: string, state: string, 
    country: Country, 
    type: AddressType
  ): Address {
    const address: Address = new Address();
    address.setCep(cep);
    address.setNumber(number);
    address.setComplement(complement);
    address.setPublicPlace(publicPlace);
    address.setPublicPlaceType(publicPlaceType);
    address.setNeighborhood(neighborhood);
    address.setObservation(observation);
    address.setCity(city);
    address.setState(state);
    address.setCountry(country);
    address.setType(type);
    return address;
  }

  private createCountry(req: express.Request): Country {
    const name: string = req.body.countryName;
    const abbreviation: string = req.body.countryAbbreviation;
    return this.defineCountry(name, abbreviation);
  }

  private defineCountry(name: string, abbreviation: string): Country {
    const country: Country = new Country();
    country.setName(name);
    country.setAbbreviation(abbreviation);
    return country;
  }

  private createCard(req: express.Request): Card {
    const number: string = req.body.cardNumber;
    const printedName: string = req.body.printedName;
    const cvv: string = req.body.verificationNumber;
    const isPreferential: boolean = req.body.isPreferential === "true";
    const banner: Banner = this.createBanner(req);
    return this.defineCard(number, printedName, cvv, isPreferential, banner);
  }

  private defineCard(number: string, printedName: string, cvv: string, isPreferential: boolean, banner: Banner): Card {
    const card: Card = new Card();
    card.setNumber(number);
    card.setPrintedName(printedName);
    card.setCvv(cvv);
    card.setIsPreferential(isPreferential);
    card.setBanner(banner);
    return card;
  }

  private createBanner(req: express.Request): Banner {
    const desc = req.body.banner;
    return this.defineBanner(desc);
  }

  private defineBanner(desc: string) {
    const banner: Banner = new Banner();
    banner.setDescription(desc);
    return banner;
  }

  private createPhone(req: express.Request): Phone {
    const ddd: string = req.body.ddd;
    const number: string = req.body.phoneNumber;
    const type: PhoneType = req.body.phoneType;
    return this.definePhone(ddd, number, type);
  }

  private definePhone(ddd: string, number: string, type: PhoneType): Phone {
    const phone: Phone = new Phone();
    phone.setDdd(ddd);
    phone.setNumber(number);
    phone.setType(type);
    return phone;
  }
}