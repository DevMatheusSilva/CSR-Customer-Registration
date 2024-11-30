import Genero from "../../enums/Genero";

export default interface ClienteFiltro {
    nome?: string;
    cpf?: string;
    genero?: Genero;
    dtNascimento?: Date;
    ddd?: string;
    telefone?: string;
}