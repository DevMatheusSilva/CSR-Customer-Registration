import {Request, Response} from "express";
import Usuario from "../entities/Usuario";
import Cliente from "../entities/Cliente";
import Cartao from "../entities/Cartao";
import Telefone from "../entities/Telefone";
import Genero from "../enums/Genero";
import TipoTelefone from "../enums/TipoTelefone";
import ClienteFachada from "../fachadas/impls/ClienteFachada";
import {BANDEIRAS, ESTADOS, LOGRADOUROS} from "../utils/constantes";
import EnderecoController from "./EnderecoController";
import EnderecoFachada from "../fachadas/impls/EnderecoFachada";

export default class ClienteController {
    private clienteFachada: ClienteFachada
    private enderecoFachada: EnderecoFachada;

    constructor(clienteFachada: ClienteFachada, enderecoFachada: EnderecoFachada) {
        this.clienteFachada = clienteFachada;
        this.enderecoFachada = enderecoFachada;
    }

    public renderizarFormularioRegistro(_: Request, res: Response): void {
        res.status(200).render("formularioRegistro", {
            BANDEIRAS,
            ESTADOS,
            LOGRADOUROS
        });
    }

    public async criarCliente(req: Request, res: Response): Promise<void> {
        try {
            const clienteDefinido: Cliente = this.definirCliente(req);
            await this.clienteFachada.salvar(clienteDefinido);
            res.status(201).redirect("http://localhost:3000/clientes");
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public async buscarTodos(_: Request, res: Response): Promise<void> {
        const clientes = await this.clienteFachada.buscarTodos();
        res.status(200).render("principal", {clientes});
    }

    public async buscarPorId(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const cliente = await this.clienteFachada.buscarPorId(id);
            res.status(200).render("formularioEdicaoDadosCliente", {
                cliente,
                BANDEIRAS,
                ESTADOS,
                LOGRADOUROS
            });
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public async atualizarCliente(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const clienteAtualizado = this.definirCliente(req);
        try {
            await this.clienteFachada.atualizar(id, clienteAtualizado);
            res.status(204).json({"message": "Cliente atualizado com sucesso"});
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public async inativarCliente(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            await this.clienteFachada.inativar(id);
            res.status(204).send();
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public definirCliente(req: Request): Cliente {
        const primeiraSenha: string = req.body.primeiraSenha;
        const segundaSenha: string = req.body.segundaSenha;
        const email: string = req.body.email;
        const cpf: string = req.body.cpf;
        const genero = req.body.genero as Genero;
        const nome = req.body.nome;
        const dtNascimento = req.body.dataNascimento;

        const usuario = new Usuario(
            email,
            primeiraSenha,
            segundaSenha,
            nome,
            cpf
        );

        const enderecos = new EnderecoController(this.enderecoFachada).definirEndereco(req);

        const cartoesData = req.body.cartoes;
        const cartoes = cartoesData.map((cartao: any) => {
            const bandeiraCode = cartao.bandeira;
            const numeroCartao = cartao.numeroCartao;
            const nomeImpresso = cartao.nomeImpresso;
            const cvv = cartao.cvv;
            const isPreferencial = cartao.ePreferencial === "true";
            return new Cartao(
                numeroCartao,
                nomeImpresso,
                bandeiraCode,
                cvv,
                isPreferencial
            )
        });

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
}