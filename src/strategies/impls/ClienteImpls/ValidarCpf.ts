import IStrategy from "../../IStrategy";
import Usuario from "../../../entities/Usuario";

export default class ValidarCpf implements IStrategy {
    public processar(usuario: Usuario) {
        const cpfRegex: RegExp = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
        if (!cpfRegex.test(usuario.cpf)) {
            throw new Error(`CPF inválido: ${usuario.cpf}`);
        }
    }
}