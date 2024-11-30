import {Request, Response} from "express";
import Endereco from "../entities/Endereco";
import TipoEndereco from "../enums/TipoEndereco";
import EnderecoFachada from "../fachadas/EnderecoFachada";
import {ESTADOS, LOGRADOUROS} from "../utils/constantes";
import Pais from "../entities/Pais";

export default class EnderecoController {
    private fachada: EnderecoFachada;

    constructor(fachada: EnderecoFachada) {
        this.fachada = fachada;
    }

    public async renderizarFormularioEdicao(req: Request, res: Response) {
        const idCliente = req.params.id;
        try {
            const enderecos = await this.fachada.buscarTodos(idCliente);
            res.status(200).render("formularioEdicaoEndereco", {
                idCliente,
                enderecos,
                ESTADOS,
                LOGRADOUROS
            });
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public async renderizarFormularioCriacao(req: Request, res: Response) {
        const idCliente = req.params.id;
        res.status(200).render("formularioCriacaoEndereco", {
            idCliente,
            ESTADOS,
            LOGRADOUROS
        });
    }

    public async criarEndereco(req: Request, res: Response) {
        const idCliente = req.params.id;
        const enderecos = this.definirEnderecos(req);
        try {
            await this.fachada.salvar(enderecos, idCliente);
            res.status(201).redirect(`/clientes/${idCliente}`);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public async atualizarEndereco(req: Request, res: Response) {
        const idCliente = req.params.id;
        const enderecosAtualizados = this.definirEnderecos(req);
        try {
            await this.fachada.atualizar(idCliente, enderecosAtualizados);
            res.status(200).redirect(`/clientes/${idCliente}`);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public definirEnderecos(req: Request): Endereco[] {
        const enderecosData = req.body.enderecos;

        return enderecosData.map((endereco: any) => {
            const {
                cep,
                numero,
                complemento,
                logradouro,
                tipoLogradouro,
                bairro,
                fraseCurta,
                observacoes,
                cidade,
                estado,
                nomePais,
                sigla,
                tipoEndereco
            } = endereco;

            const pais = new Pais(
                nomePais,
                sigla
            );

            return new Endereco(
                cep,
                numero,
                complemento,
                logradouro,
                tipoLogradouro,
                bairro,
                fraseCurta,
                observacoes,
                cidade,
                estado,
                pais,
                tipoEndereco as TipoEndereco
            );
        });
    }
}