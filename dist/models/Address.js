"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entitie_1 = __importDefault(require("./Entitie"));
const AddressType_1 = __importDefault(require("./enums/AddressType"));
class Address extends Entitie_1.default {
    setCep(cep) {
        const cepRegex = /\d{5}-\d{3}/;
        if (!cepRegex.test(cep)) {
            throw new Error(`Invalid CEP: ${cep}`);
        }
        this.cep = cep;
    }
    setNumber(number) {
        const numberRegex = /^\d+([a-zA-Z]?|\d*\-\d*)$/;
        if (!numberRegex.test(number)) {
            throw new Error(`Invalid number: ${number}`);
        }
        this.number = number;
    }
    setComplement(complement) {
        this.complement = complement;
    }
    setPublicPlace(publicPlace) {
        this.publicPlace = publicPlace;
    }
    setPublicPlaceType(publicPlaceType) {
        this.publicPlaceType = publicPlaceType;
    }
    setNeighborhood(neighborhood) {
        this.neighborhood = neighborhood;
    }
    setObservation(observation) {
        this.observation = observation;
    }
    setCity(city) {
        this.city = city;
    }
    setState(state) {
        this.state = state;
    }
    setCountry(country) {
        this.country = country;
    }
    setType(type) {
        if (!Object.values(AddressType_1.default).includes(type)) {
            throw new Error(`Invalid address type: ${type}`);
        }
        this.type = type;
    }
}
exports.default = Address;
