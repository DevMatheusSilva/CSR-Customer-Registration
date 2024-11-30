import IStrategy from "../../IStrategy";
import Entidade from "../../../entities/Entidade";
import LogDAO from "../../../daos/impls/LogDAO";
import Usuario from "../../../entities/Usuario";
import Log from "../../../entities/Log";
import TipoLog from "../../../enums/TipoLog";
import Endereco from "../../../entities/Endereco";
import Cliente from "../../../entities/Cliente";

export default class GerarLogAtualizacao implements IStrategy {
    private logDAO;

    constructor(logDAO: LogDAO) {
        this.logDAO = logDAO;
    }

    public async processar(entidade: Entidade) {
        if (entidade instanceof Cliente) {
            const logSalvo = await this.logDAO.salvar(
                new Log(entidade.id, "Usuario", TipoLog.ATUALIZACAO_DADOS_CLIENTE)
            );
            console.log(`O usuário ${entidade.usuario.nome} foi atualizado com sucesso em ${logSalvo.dataEHora}`);
        }

        if (entidade instanceof Endereco) {
            const logSalvo = await this.logDAO.salvar(
                new Log(entidade.id, "Endereco", TipoLog.ATUALIZACAO_DADOS_ENDERECO)
            );
            console.log(`O endereço ${entidade.fraseCurta}' foi atualizado com sucesso em ${logSalvo.dataEHora}`);
        }

        if (entidade instanceof Usuario) {
            const logSalvo = await this.logDAO.salvar(
                new Log(entidade.id, "Usuario", TipoLog.ATUALIZACAO_SENHA)
            );
            console.log(`A senha do usuário ${entidade.nome} foi atualizada com sucesso em ${logSalvo.dataEHora}`);
        }
    }
}