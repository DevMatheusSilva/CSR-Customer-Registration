import Entidade from "../entities/Entidade";

export default interface IDAO<T> {
    salvar(entidade: T): Promise<T>;

    buscarTodos(): Promise<Entidade[] | null>;
}