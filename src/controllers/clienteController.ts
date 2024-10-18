import * as fs from "fs";           
import * as path from "path";           
import express from "express";           
import Cliente from "../entities/Cliente";
import Pais from "../entities/Pais";           
import Endereco from "../entities/Endereco";           
import Cartao from "../entities/Cartao";           
import Bandeira from "../entities/Bandeira";           
import Telefone from "../entities/Telefone";          
import Genero from "../enums/Genero";
import TipoEndereco from "../enums/TipoEndereco";           
import TipoTelefone from "../enums/TipoTelefone";
import Log from "../entities/Log";

export default class ClienteController {
  private clientes = new Array<Cliente>();

  public renderizarPaginaPrincipal(_: express.Request, res: express.Response): void {
    res.status(200).render("principal");
  }

  public renderizarFormularioClientes(_: express.Request, res: express.Response): void {
    const bandeiras = this.jsonParaObjeto("../../src/json/bandeiras.json");
    const estados = this.jsonParaObjeto("../../src/json/estados.json");

    res.status(200).render("clientes", { bandeiras, estados });
  }

  public criarCliente(req: express.Request, res: express.Response): void {
    try {
      const cliente = this.definirCliente(req);
      this.salvar(cliente);
      const log = new Log(new Date(), cliente);
      res.status(201).json({
        message: log.gerarLog(),
        data: cliente 
      });
    } catch (error) {
      const err = error as Error;
      res.status(400).json({ message: err.message });
    }
  }

  private definirCliente(req: express.Request): Cliente {
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
    this.validarExistencia(email, cpf);

    const nomePais = req.body.nomePais;
    const sigla = req.body.sigla;
    const pais: Pais = new Pais(nomePais, sigla);
    
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
    const endereco: Endereco = new Endereco(
      cep, 
      numero, 
      complemento, 
      logradouro, 
      tipoLogradouro, 
      bairro, 
      fraseCurta, 
      observacao, 
      cidade, estado, pais, tipoEndereco
    );

    const descricao = req.body.bandeira;
    const bandeira: Bandeira = new Bandeira(descricao);
    
    const numeroCartao = req.body.numeroCartao;
    const nomeImpresso = req.body.nomeImpresso;
    const cvv = req.body.cvv;
    const isPreferencial = req.body.ePreferencial === "true";
    const cartao: Cartao = new Cartao(
      numeroCartao, 
      nomeImpresso, 
      bandeira, 
      cvv, 
      isPreferencial
    );
    
    const ddd = req.body.ddd;
    const numeroTelefone = req.body.numeroTelefone;
    const tipoTelefone = req.body.tipoTelefone as TipoTelefone;
    const telefone: Telefone = new Telefone(ddd, numeroTelefone, tipoTelefone);
    const cliente: Cliente = new Cliente(
      genero, 
      nome, 
      dtNascimento, 
      cpf, 
      telefone, 
      cartao, 
      endereco, 
      email, primeiraSenha);

    return cliente;
  }

  private salvar(cliente: Cliente): void {
    cliente.validarDadosObrigatorios();
    this.clientes.push(cliente);
  } 

  private validarExistencia(email: string, cpf: string): void {
    if (this.clientes.some(((c) => c.email === email)) || this.clientes.some(((c) => c.cpf === cpf))) {
      throw new Error("Este cliente já existe");
    }
  }

  private jsonParaObjeto(caminho: string): any {
    const caminhoArquivo = path.resolve(__dirname, caminho);
    return JSON.parse(fs.readFileSync(caminhoArquivo, "utf-8"));
  }
}