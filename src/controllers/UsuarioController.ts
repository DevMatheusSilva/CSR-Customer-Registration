import {Request, Response} from "express";
import UsuarioFachada from "../fachadas/UsuarioFachada";
import Usuario from "../entities/Usuario";

export default class UsuarioController {
    private usuarioFachada: UsuarioFachada;

    constructor(usuarioFachada: UsuarioFachada) {
        this.usuarioFachada = usuarioFachada;
    }

    public async renderizarFormularioAlterarSenha(req: Request, res: Response) {
        const idCliente = req.params.id;
        res.status(200).render("formularioEdicaoSenha", {
            idCliente,
        });
    }

    public async alterarSenha(req: Request, res: Response) {
        const id = req.params.id;
        const usuario = this.definirUsuario(req);
        try {
            await this.usuarioFachada.atualizar(id, usuario);
            res.status(200).redirect(`/clientes/`);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({mensagem: err.message});
        }
    }

    public definirUsuario(req: Request): Usuario {
        const {
            email,
            primeiraSenha,
            confirmacaoSenha,
            nome,
            cpf,
        } = req.body;

        return new Usuario(
            email,
            primeiraSenha,
            confirmacaoSenha,
            nome,
            cpf
        );
    }
}