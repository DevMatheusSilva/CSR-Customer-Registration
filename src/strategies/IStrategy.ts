import Entidade from "../entities/Entidade";

export default interface IStrategy {
    processar(entidade: Entidade): void;
}