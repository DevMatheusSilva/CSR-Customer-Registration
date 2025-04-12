import {Request, Response} from "express";
import CartaoFachada from "../fachadas/CartaoFachada";
import Cartao from "../entities/Cartao";
import {BANDEIRAS} from "../utils/constantes";

export default class CartaoController {
    private fachada: CartaoFachada;

    constructor(fachada: CartaoFachada) {
        this.fachada = fachada;
    }

    public async renderizarFormularioCriacao(req: Request, res: Response) {
        const idCliente = req.params.id;
        res.status(200).render("formularioCriacaoCartao", {
            idCliente,
            BANDEIRAS
        });
    }

    public async criarCartao(req: Request, res: Response) {
        const idCliente = req.params.id;
        const cartoes = this.definirCartoes(req);
        try {
            await this.fachada.salvar(cartoes, idCliente);
            res.status(201).redirect(`/clientes/${idCliente}`);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public definirCartoes(req: Request): Cartao[] {
        const cartoesData = req.body.cartoes;

        return cartoesData.map((cartao: any) => {
            const {
                numeroCartao,
                nomeImpresso,
                bandeiraCode,
                cvv,
            } = cartao;

            const isPreferencial = cartao.isPreferencial === 'true';

            return new Cartao(
                numeroCartao,
                nomeImpresso,
                bandeiraCode,
                cvv,
                isPreferencial
            );
        });
    }
}