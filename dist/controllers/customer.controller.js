"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const Country_1 = __importDefault(require("../models/Country"));
const Address_1 = __importDefault(require("../models/Address"));
const Card_1 = __importDefault(require("../models/Card"));
const Banner_1 = __importDefault(require("../models/Banner"));
const Phone_1 = __importDefault(require("../models/Phone"));
const Customer_1 = __importDefault(require("../models/Customer"));
class CustomerController {
    constructor() {
        this.customersList = new Array();
    }
    renderHomePage(_, res) {
        res.status(200).render("home");
    }
    renderCustomersForm(_, res) {
        const pathToBanner = path.resolve(__dirname, "../../src/models/data/cardBanners.json");
        const banners = JSON.parse(fs.readFileSync(pathToBanner, "utf-8"));
        res.status(200).render("customers", { banners });
    }
    defineCustomer(req, res) {
        const passwordFirst = req.body.passwordFirst;
        const passwordSecond = req.body.passwordSecond;
        const customer = new Customer_1.default();
        if (passwordFirst !== passwordSecond) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }
        try {
            customer.setPassword(passwordFirst);
        }
        catch (error) {
            const err = error;
            res.status(400).json({ message: err.message });
            return;
        }
        try {
            customer.setOneAddress(this.defineAddress(req));
        }
        catch (error) {
            const err = error;
            res.status(400).json({ message: err.message });
            return;
        }
        try {
            customer.setOneCard(this.defineCard(req));
        }
        catch (error) {
            const err = error;
            res.status(400).json({ message: err.message });
            return;
        }
        try {
            customer.setOnePhone(this.definePhone(req));
        }
        catch (error) {
            const err = error;
            res.status(400).json({ message: err.message });
            return;
        }
        try {
            customer.setGender(req.body.gender);
        }
        catch (error) {
            const err = error;
            res.status(400).json({ message: err.message });
            return;
        }
        try {
            customer.setName(req.body.name);
        }
        catch (error) {
            const err = error;
            res.status(400).json({ message: err.message });
            return;
        }
        try {
            customer.setBirthDate(req.body.birthDate);
        }
        catch (error) {
            const err = error;
            res.status(400).json({ message: err.message });
            return;
        }
        if (this.customersList.some((c) => c.cpf === req.body.cpf)) {
            res.status(400).json({ message: "CPF already registered" });
            return;
        }
        try {
            customer.setCpf(req.body.cpf);
        }
        catch (error) {
            const err = error;
            res.status(400).json({ message: err.message });
            return;
        }
        if (this.customersList.some((c) => c.email === req.body.email)) {
            res.status(400).json({ message: "Email already registered" });
            return;
        }
        try {
            customer.setEmail(req.body.email);
        }
        catch (error) {
            const err = error;
            res.status(400).json({ message: err.message });
            return;
        }
        this.saveCustomer(customer);
        res.status(201).json(customer);
    }
    defineAddress(req) {
        const address = new Address_1.default();
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
        address.setType(req.body.addressType);
        return address;
    }
    defineCountry(req) {
        const country = new Country_1.default();
        country.setName(req.body.countryName);
        country.setAbbreviation(req.body.countryAbbreviation);
        return country;
    }
    defineCard(req) {
        const card = new Card_1.default();
        card.setNumber(req.body.cardNumber);
        card.setPrintedName(req.body.printedName);
        card.setCvv(req.body.verificationNumber);
        card.setIsPreferential(req.body.isPreferential === "true");
        card.setBanner(this.defineBanner(req));
        return card;
    }
    defineBanner(req) {
        const banner = new Banner_1.default();
        banner.setDescription(req.body.banner);
        return banner;
    }
    definePhone(req) {
        const phone = new Phone_1.default();
        phone.setDdd(req.body.ddd);
        phone.setNumber(req.body.phoneNumber);
        phone.setType(req.body.phoneType);
        return phone;
    }
    saveCustomer(customer) {
        this.customersList.push(customer);
    }
}
exports.default = CustomerController;
