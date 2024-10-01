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
  private customersList = new Array<Customer>();

  constructor(app: express.Application) {
    this.initializeRoutes(app);
  };

  private initializeRoutes(app: express.Application): void {
    app.get("/", (_, res) => {this.renderHomePage(_, res);});
    app.get("/customers", (_, res) => {this.renderCustomersForm(_, res);});
    app.post("/customers", (req, res) => {this.defineCustomer(req, res);});
  }

  private renderHomePage(_: express.Request, res: express.Response): void {
    res.status(200).render("home");
  }

  private renderCustomersForm(_: express.Request, res: express.Response): void {
    res.status(200).render("customers");
  }

  private defineCustomer(req: express.Request, res: express.Response): void {
    const passwordFirst: string = req.body.passwordFirst;
    const passwordSecond: string = req.body.passwordSecond;

    if(passwordFirst !== passwordSecond) {
      res.status(400).json({ message: "Passwords do not match" });
      return;
    }
    const customer: Customer = new Customer();

    customer.setPassword(passwordFirst);

    try {
      customer.setOneAddress(this.defineAddress(req));
    } catch (error) {
      const err = error as Error;
      res.status(400).json({ message: err.message });
      return;
    }

    try {
      customer.setOneCard(this.defineCard(req));
    } catch (error) {
      const err = error as Error;
      res.status(400).json({ message: err.message });
      return;
    }

    try {
      customer.setOnePhone(this.definePhone(req));
    } catch (error) {
      const err = error as Error;
      res.status(400).json({ message: err.message });
      return;
    }

    customer.setGender(req.body.gender as Gender);
    customer.setName(req.body.name);
    customer.setBirthDate(req.body.birthDate);

    if (this.customersList.some((c) => c.cpf === req.body.cpf)) {
      res.status(400).json({ message: "CPF already registered" });
      return;
    }
    customer.setCpf(req.body.cpf);
    
    if (this.customersList.some((c) => c.email === req.body.cpf)) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }
    customer.setEmail(req.body.email);

    this.saveCustomer(customer);
    res.status(201).json(this.customersList);
  } 

  private defineAddress(req: express.Request): Address {
    const address: Address = new Address();

    if (!address.validateCep(req.body.cep)) {
      throw new Error(`Invalid CEP: ${req.body.cep}`);
    }
    address.setCep(req.body.cep);
    
    address.setNumber(req.body.number);
    address.setComplement(req.body.complement);
    address.setPublicPlace(req.body.publicPlace);
    address.setPublicPlaceType(req.body.publicPlaceType);
    address.setNeighborhood(req.body.neighborhood);
    address.setObservation(req.body.observation);
    address.setCity(req.body.city);
    address.setState(req.body.state);
    address.setCountry(this.defineCountry(req));
    
    if (!address.validateType(req.body.addressType as AddressType)) {
      throw new Error(`Invalid address type: ${req.body.addressType}`);
    }
    address.setType(req.body.addressType as AddressType);
    
    return address;
  }

  private defineCountry(req: express.Request): Country {
    const country: Country = new Country();
    country.setName(req.body.countryName);

    if(!country.validateAbbr(req.body.countryAbbreviation)) {
      throw new Error(`Invalid country abbreviation: ${req.body.countryAbbreviation}`);
    }
    country.setAbbreviation(req.body.countryAbbreviation);

    return country;
  }

  private defineCard(req: express.Request): Card {
    const card: Card = new Card();

    if(!card.validateCardNumber(req.body.cardNumber)) {
      throw new Error(`Invalid card number: ${req.body.cardNumber}`);
    }
    card.setNumber(req.body.cardNumber);

    card.setPrintedName(req.body.printedName);

    if(!card.validateCardCvv(req.body.verificationNumber)) {
      throw new Error(`Invalid CVV: ${req.body.verificationNumber}`);
    }
    card.setCvv(req.body.verificationNumber);

    card.setIsPreferential(req.body.isPreferential === "true");
    card.setBanner(this.defineBanner(req));

    return card;
  }

  private defineBanner(req: express.Request): Banner {
    const banner: Banner = new Banner();
    banner.setDescription(req.body.banner);
    return banner;
  }

  private definePhone(req: express.Request): Phone {
    const phone: Phone = new Phone();

    if(!phone.validateDdd(req.body.ddd)) {
      throw new Error(`Invalid phone number: ${req.body.ddd}`);
    }
    phone.setDdd(req.body.ddd);

    if(!phone.validateNumber(req.body.phoneNumber)) {
      throw new Error(`Invalid phone number: ${req.body.phoneNumber}`);
    }
    phone.setNumber(req.body.phoneNumber);

    if(!phone.validateType(req.body.phoneType as PhoneType)) {
      throw new Error(`Invalid phone type: ${req.body.phoneType}`);
    }
    phone.setType(req.body.phoneType as PhoneType);

    return phone;
  }

  private saveCustomer(customer: Customer): void{
    this.customersList.push(customer);
  }
}