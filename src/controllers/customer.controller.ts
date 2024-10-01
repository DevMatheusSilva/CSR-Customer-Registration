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
    const pathToBanner = path.resolve(__dirname, "../models/data/cardBanners.json");
    const banners = JSON.parse(fs.readFileSync(pathToBanner, "utf-8"));
    res.status(200).render("customers", { banners });
  } 

  defineCustomer(req: express.Request, res: express.Response): void {
    const passwordFirst: string = req.body.passwordFirst;
    const passwordSecond: string = req.body.passwordSecond;

    const customer: Customer = new Customer();
    
    
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
    
    customer.setPassword(passwordFirst, passwordSecond);
    customer.setGender(req.body.gender as Gender);
    customer.setName(req.body.name);
    customer.setBirthDate(req.body.birthDate);

    if (this.customersList.some((c) => c.cpf === req.body.cpf)) {
      res.status(400).json({ message: "CPF already registered" });
      return;
    }
    customer.setCpf(req.body.cpf);
    
    if (this.customersList.some((c) => c.email === req.body.email)) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }
    customer.setEmail(req.body.email);

    this.saveCustomer(customer);
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

  private saveCustomer(customer: Customer): void{
    this.customersList.push(customer);
  }
}