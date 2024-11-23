import {Request, Response} from "express";
import Endereco from "../entities/Endereco";
import TipoEndereco from "../enums/TipoEndereco";
import EnderecoFachada from "../fachadas/impls/EnderecoFachada";
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
            const enderecos = await this.fachada.buscarPorIdCliente(idCliente);
            res.status(200).render("formularioEdicaoDadosEndereco", {
                enderecos,
                ESTADOS,
                LOGRADOUROS
            });
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public definirEndereco(req: Request): Endereco[] {
        const enderecoData = req.body.enderecos;

        return enderecoData.map((endereco: any) => {
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