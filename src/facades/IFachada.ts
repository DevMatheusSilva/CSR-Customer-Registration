import Entidade from "../entities/Entidade";

export default interface IFachada {
    salvar(entidade: Entidade): Promise<Entidade>;
}