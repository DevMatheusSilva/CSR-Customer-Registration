import Entidade from "../entities/Entidade";

export default interface IFachada {
    salvar(entidade: Entidade): Promise<Entidade>;

    buscarTodos(): Promise<Entidade[]>;

    buscarPorId(id: string): Promise<Entidade>;

    atualizar(id: string, entidade: Entidade): Promise<void>;

    inativar(id: string): Promise<void>;
}