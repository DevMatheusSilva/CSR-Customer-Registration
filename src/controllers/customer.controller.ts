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
    const customer = new Customer(email, passwordFirst, name, birthDate, gender, cpf, [card], [address], [phone], 0);
    res.status(201).json(customer);
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
    return new Address(
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
  
  private createCountry(req: express.Request): Country {
    const name = req.body.countryName;
    const abbreviation = req.body.countryAbbreviation;
    return new Country(name, abbreviation);
  }

  private createCard(req: express.Request): Card {
    const number: string = req.body.cardNumber;
    const printedName: string = req.body.printedName;
    const cvv: string = req.body.verificationNumber;
    const isPreferential: boolean = req.body.isPreferential === "true";
    const banner: Banner = this.createBanner(req);
    return new Card(number, printedName, cvv, isPreferential, banner);
  }

  private createBanner(req: express.Request): Banner {
    const desc = req.body.banner;
    return new Banner(desc);
  }

  private createPhone(req: express.Request): Phone {
    const ddd: string = req.body.ddd;
    const number: string = req.body.phoneNumber;
    const type: PhoneType = req.body.phoneType;
    return new Phone(number, ddd, type);
  }
}