import jsonParaObjeto from "./jsonParaObjeto";

export const BANDEIRAS = [
    {name: "Visa", code: "VISA"},
    {name: "MasterCard", code: "MC"},
    {name: "American Express", code: "AMEX"},
    {name: "Diners Club", code: "DC"},
    {name: "Elo", code: "ELO"},
    {name: "Hipercard", code: "HPC"},
    {name: "Discover", code: "DISC"},
    {name: "JCB", code: "JCB"},
    {name: "UnionPay", code: "UPI"},
];
export const ESTADOS = jsonParaObjeto("../json/estados.json");
export const LOGRADOUROS = jsonParaObjeto("../json/logradouros.json");