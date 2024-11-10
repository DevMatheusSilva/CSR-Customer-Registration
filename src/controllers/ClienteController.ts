import * as fs from "fs";
import * as path from "path";
import express from "express";
import Usuario from "../entities/Usuario";
import Cliente from "../entities/Cliente";
import Pais from "../entities/Pais";
import Endereco from "../entities/Endereco";
import Cartao from "../entities/Cartao";
import Bandeira from "../entities/Bandeira";
import Telefone from "../entities/Telefone";
import Genero from "../enums/Genero";
import TipoEndereco from "../enums/TipoEndereco";
import TipoTelefone from "../enums/TipoTelefone";
import ClienteFachada from "../fachadas/ClienteFachada";

export default class ClienteController {
    private clienteFachada: ClienteFachada;

    constructor(clienteFachada: ClienteFachada) {
        this.clienteFachada = clienteFachada;
    }

    public async renderizarPaginaPrincipal(_: express.Request, res: express.Response): Promise<void> {
        const clientes = await this.clienteFachada.buscarTodos();
        res.status(200).render("principal", {clientes});
    }

    public renderizarFormularioClientes(_: express.Request, res: express.Response): void {
        const bandeiras = this.jsonParaObjeto("../../src/json/bandeiras.json");
        const estados = this.jsonParaObjeto("../../src/json/estados.json");
        res.status(200).render("clientes", {bandeiras, estados});
    }

    public async criarCliente(req: express.Request, res: express.Response): Promise<void> {
        try {
            const clienteDefinido: Cliente = await this.definirCliente(req);
            await this.clienteFachada.salvar(clienteDefinido);
            res.status(201).redirect("http://localhost:3000/");
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public async inativarCliente(req: express.Request, res: express.Response): Promise<void> {
        try {
            const id = req.params.id;
            await this.clienteFachada.inativarCliente(id);
            res.status(204).send();
        } catch (error) {
            const err = error as Error;
            console.log(error)
            res.status(400).json({message: err.message});
        }
    }

    private async definirCliente(req: express.Request): Promise<Cliente> {
        const primeiraSenha: string = req.body.primeiraSenha;
        const segundaSenha: string = req.body.segundaSenha;
        const email: string = req.body.email;
        const cpf: string = req.body.cpf;
        const genero = req.body.genero as Genero;
        const nome = req.body.nome;
        const dtNascimento = req.body.dataNascimento;

        if (primeiraSenha !== segundaSenha) {
            throw new Error("As senhas não correspondem");
        }

        const usuario = new Usuario(email, primeiraSenha, nome, cpf);

        const nomePais = req.body.nomePais;
        const sigla = req.body.sigla;
        const pais = new Pais(nomePais, sigla);

        const cep = req.body.cep;
        const numero = req.body.numero;
        const complemento = req.body.complemento;
        const logradouro = req.body.logradouro;
        const tipoLogradouro = req.body.tipoLogradouro;
        const bairro = req.body.bairro;
        const fraseCurta = req.body.fraseCurta;
        const observacao = req.body.observacoes;
        const cidade = req.body.cidade;
        const estado = req.body.estado;
        const tipoEndereco = req.body.tipoEndereco as TipoEndereco;
        const enderecos: Endereco[] = [
            new Endereco(
                cep,
                numero,
                complemento,
                logradouro,
                tipoLogradouro,
                bairro,
                fraseCurta,
                observacao,
                cidade,
                estado,
                pais,
                tipoEndereco
            )
        ];

        const descricao = req.body.bandeira;
        const bandeira: Bandeira = new Bandeira(descricao);

        const numeroCartao = req.body.numeroCartao;
        const nomeImpresso = req.body.nomeImpresso;
        const cvv = req.body.cvv;
        const isPreferencial = req.body.ePreferencial === "true";
        const cartoes: Cartao[] = [
            new Cartao(
                numeroCartao,
                nomeImpresso,
                bandeira,
                cvv,
                isPreferencial
            )
        ];

        const ddd = req.body.ddd;
        const numeroTelefone = req.body.numeroTelefone;
        const tipoTelefone = req.body.tipoTelefone as TipoTelefone;
        const telefone: Telefone = new Telefone(ddd, numeroTelefone, tipoTelefone);

        return new Cliente(
            genero,
            dtNascimento,
            telefone,
            cartoes,
            enderecos,
            usuario,
        );
    }

    private jsonParaObjeto(caminho: string): any {
        const caminhoArquivo = path.resolve(__dirname, caminho);
        return JSON.parse(fs.readFileSync(caminhoArquivo, "utf-8"));
    }
}