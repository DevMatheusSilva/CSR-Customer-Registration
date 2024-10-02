import * as fs from "fs";
import * as path from "path";
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

  renderHomePage(_: express.Request, res: express.Response): void {
    res.status(200).render("home");
  }

  renderCustomersForm(_: express.Request, res: express.Response): void {
    const pathToBanner = path.resolve(__dirname, "../../src/models/data/cardBanners.json");
    const banners = JSON.parse(fs.readFileSync(pathToBanner, "utf-8"));
    res.status(200).render("customers", { banners });
  } 

  public createCustomer(req: express.Request, res: express.Response): void {
    try {
      this.defineCustomer(req, res);
    } catch (error) {
      const err = error as Error;
      res.status(400).json({ message: err.message });
    }
  }

  private defineCustomer(req: express.Request, res: express.Response): void {
    const passwordFirst: string = req.body.passwordFirst;
    const passwordSecond: string = req.body.passwordSecond;
    const address: Address = this.defineAddress(req);
    const card: Card = this.defineCard(req);
    const phone: Phone = this.definePhone(req);
    const gender: Gender = req.body.gender;
    const name: string = req.body.name;
    const birthDate: string = req.body.birthDate;
    const cpf: string = req.body.cpf;
    const email: string = req.body.email;

    const customer: Customer = new Customer();

    if (passwordFirst !== passwordSecond) {
      throw new Error("The passwords do not match.");
    }
    if (this.customersList.some(((c) => c.email === email)) || this.customersList.some(((c) => c.cpf === cpf))) {
      throw new Error("This client aready exists");
    }

    customer.setPassword(passwordFirst);
    customer.setOneAddress(address);
    customer.setOneCard(card);
    customer.setOnePhone(phone);
    customer.setGender(gender);
    customer.setName(name);
    customer.setBirthDate(birthDate);
    customer.setCpf(cpf);
    customer.setEmail(email);

    this.save(customer);
    res.status(201).json(customer);
  }

  private defineAddress(req: express.Request): Address {
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
    address.setCountry(this.defineCountry(req));
    address.setType(req.body.addressType as AddressType);

    return address;
  }

  private defineCountry(req: express.Request): Country {
    const country: Country = new Country();

    country.setName(req.body.countryName);
    country.setAbbreviation(req.body.countryAbbreviation);

    return country;
  }

  private defineCard(req: express.Request): Card {
    const card: Card = new Card();

    card.setNumber(req.body.cardNumber);
    card.setPrintedName(req.body.printedName);
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

    phone.setDdd(req.body.ddd);
    phone.setNumber(req.body.phoneNumber);
    phone.setType(req.body.phoneType as PhoneType);

    return phone;
  }

  private save(customer: Customer): void{
    this.customersList.push(customer);
  }
}