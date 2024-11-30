import {Request, Response} from "express";
import Cliente from "../entities/Cliente";
import Telefone from "../entities/Telefone";
import Genero from "../enums/Genero";
import TipoTelefone from "../enums/TipoTelefone";
import ClienteFachada from "../fachadas/ClienteFachada";
import {BANDEIRAS, ESTADOS, LOGRADOUROS} from "../utils/constantes";
import UsuarioController from "./UsuarioController";
import EnderecoController from "./EnderecoController";
import ClienteFiltro from "./interfaces/ClienteFiltro";

export default class ClienteController {
    private fachada: ClienteFachada;
    private usuarioController: UsuarioController;
    private enderecoController: EnderecoController;

    constructor(
        usuarioController: UsuarioController,
        enderecoController: EnderecoController,
        fachada: ClienteFachada
    ) {
        this.usuarioController = usuarioController;
        this.enderecoController = enderecoController;
        this.fachada = fachada;
    }

    public renderizarFormularioRegistro(_: Request, res: Response): void {
        res.status(200).render("formularioRegistro", {
            BANDEIRAS,
            ESTADOS,
            LOGRADOUROS
        });
    }

    public async renderizarFormularioEdicao(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        try {
            const cliente = await this.fachada.buscarPorId(id);
            res.status(200).render("formularioEdicaoCliente", {
                cliente,
                cartoes: cliente.cartoes,
                BANDEIRAS,
                ESTADOS,
                LOGRADOUROS
            });
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public async renderizarFormularioVisualizacao(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        try {
            const cliente = await this.fachada.buscarPorId(id);
            res.status(200).render("visualizacaoDadosCliente", {
                cliente
            });
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public async criarCliente(req: Request, res: Response): Promise<void> {
        try {
            const clienteDefinido: Cliente = this.definirCliente(req);
            await this.fachada.salvar(clienteDefinido);
            res.status(201).redirect("/clientes");
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public async buscarTodos(req: Request, res: Response): Promise<void> {
        if (req.url.includes("/filtrar")) {
            try {
                const filtros: ClienteFiltro = req.query;
                const clientes = await this.fachada.buscarTodos(filtros);
                res.status(200).render("principal", {
                    clientes,
                    cssLink: "../styles/styles.css",
                    filtros: filtros,
                    filtrando: true
                });
            } catch (error) {
                const err = error as Error;
                res.status(500).json({message: err.message});
            }
        } else {
            const clientes = await this.fachada.buscarTodos();
            res.status(200).render("principal", {
                clientes,
                cssLink: "./styles/styles.css",
                filtrando: false
            });
        }
    }

    public async atualizarCliente(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const clienteAtualizado = this.definirCliente(req);
        try {
            await this.fachada.atualizar(id, clienteAtualizado);
            res.status(204).json({message: "Cliente atualizado com sucesso"});
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public async inativarCliente(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            await this.fachada.inativar(id);
            res.status(204).send();
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public definirCliente(req: Request): Cliente {
        const genero = req.body.genero as Genero;
        const dtNascimento = req.body.dataNascimento;

        const usuario = this.usuarioController.definirUsuario(req);
        const enderecos = this.enderecoController.definirEnderecos(req);

        const ddd = req.body.ddd;
        const numeroTelefone = req.body.numeroTelefone;
        const tipoTelefone = req.body.tipoTelefone as TipoTelefone;
        const telefone: Telefone = new Telefone(ddd, numeroTelefone, tipoTelefone);

        return new Cliente(
            genero,
            dtNascimento,
            telefone,
            enderecos,
            usuario,
        );
    }
}