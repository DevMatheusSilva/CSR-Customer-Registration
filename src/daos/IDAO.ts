export default interface IDAO<T> {
    salvar(entidade: T): Promise<T>;
}