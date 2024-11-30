import IStrategy from "../../IStrategy";
import Cliente from "../../../entities/Cliente";
import Entidade from "../../../entities/Entidade";
import Endereco from "../../../entities/Endereco";

export default class Atualizar implements IStrategy {
    processar(entidade: Entidade) {
        if (entidade instanceof Cliente) {
            const clienteAtualizado = entidade.novosDados;
            entidade.genero = clienteAtualizado.genero;
            entidade.usuario.nome = clienteAtualizado.usuario.nome;
            entidade.dtNascimento = clienteAtualizado.dtNascimento;
            entidade.usuario.cpf = clienteAtualizado.usuario.cpf;
            entidade.telefone.ddd = clienteAtualizado.telefone.ddd;
            entidade.telefone.numero = clienteAtualizado.telefone.numero;
            entidade.telefone.tipo = clienteAtualizado.telefone.tipo;
            entidade.usuario.email = clienteAtualizado.usuario.email;
        }

        if (entidade instanceof Endereco) {
            const enderecoAtualizado = entidade.novosDados;
            entidade.cep = enderecoAtualizado.cep;
            entidade.numero = enderecoAtualizado.numero;
            entidade.complemento = enderecoAtualizado.complemento;
            entidade.logradouro = enderecoAtualizado.logradouro;
            entidade.tipoLogradouro = enderecoAtualizado.tipoLogradouro;
            entidade.bairro = enderecoAtualizado.bairro;
            entidade.fraseCurta = enderecoAtualizado.fraseCurta;
            entidade.observacao = enderecoAtualizado.observacao;
            entidade.cidade = enderecoAtualizado.cidade;
            entidade.estado = enderecoAtualizado.estado;
            entidade.pais.nome = enderecoAtualizado.pais.nome;
            entidade.pais.sigla = enderecoAtualizado.pais.sigla;
            entidade.tipo = enderecoAtualizado.tipo;
        }
    }
}