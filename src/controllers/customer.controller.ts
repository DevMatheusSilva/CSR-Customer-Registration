import * as fs from "fs";
import * as path from "path";
import express from "express";
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

  public renderHomePage(_: express.Request, res: express.Response): void {
    res.status(200).render("home");
  }

  public renderCustomersForm(_: express.Request, res: express.Response): void {
    const pathToBanner = path.resolve(__dirname, "../../src/models/data/cardBanners.json");
    const banners = JSON.parse(fs.readFileSync(pathToBanner, "utf-8"));

    const pathToStates = path.resolve(__dirname, "../../src/models/data/states.json");
    const states = JSON.parse(fs.readFileSync(pathToStates, "utf-8"));

    res.status(200).render("customers", { banners, states });
  }

  public createCustomer(req: express.Request, res: express.Response): void {
    try {
      const customer = this.defineCustomer(req);
      this.customersList.push(customer);
      res.status(201).json(customer);
    } catch (error) {
      const err = error as Error;
      res.status(400).json({ message: err.message });
    }
  }

  private defineCustomer(req: express.Request): Customer {
    const passwordFirst: string = req.body.passwordFirst;
    const passwordSecond: string = req.body.passwordSecond;
    const email: string = req.body.email;
    const cpf: string = req.body.cpf;

    if (passwordFirst !== passwordSecond) {
      throw new Error("The passwords do not match.");
    }
    this.validateIfCustomerExists(email, cpf);

    const customer: Customer = new Customer();
    customer.setGender(req.body.gender);
    customer.setName(req.body.name);
    customer.setPassword(passwordFirst);
    customer.setBirthDate(req.body.birthDate);
    customer.setCpf(req.body.cpf);
    customer.setEmail(req.body.email);

    const country: Country = new Country();
    country.setName(req.body.countryName);
    country.setAbbreviation(req.body.countryAbbreviation);

    const address: Address = new Address();
    address.setCep(req.body.cep);
    address.setNumber(req.body.number);
    address.setComplement(req.body.complement);
    address.setPublicPlace(req.body.publicPlace);
    address.setPublicPlaceType(req.body.publicPlaceType);
    address.setNeighborhood(req.body.neighborhood);
    address.setObservation(req.body.observation);
    address.setCity(req.body.city);
    address.setState(req.body.state);
    address.setCountry(country);
    address.setType(req.body.addressType as AddressType);

    const banner: Banner = new Banner();
    banner.setDescription(req.body.banner);
    
    const card: Card = new Card();
    card.setNumber(req.body.cardNumber);
    card.setPrintedName(req.body.printedName);
    card.setCvv(req.body.verificationNumber);
    card.setIsPreferential(req.body.isPreferential === "true");
    card.setBanner(banner);

    const phone: Phone = new Phone();  
    phone.setDdd(req.body.ddd);
    phone.setNumber(req.body.phoneNumber);
    phone.setType(req.body.phoneType as PhoneType);

    customer.setOneAddress(address);
    customer.setOneCard(card);
    customer.setOnePhone(phone);

    return customer;
  }

  private validateIfCustomerExists(email: string, cpf: string): void {
    if (this.customersList.some(((c) => c.email === email)) || this.customersList.some(((c) => c.cpf === cpf))) {
      throw new Error("This client aready exists");
    }
  }
}