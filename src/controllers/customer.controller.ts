import * as fs from "fs";           
import * as path from "path";           
import express from "express";           
import Cliente from "../models/Cliente";
import Pais from "../models/Pais";           
import Endereco from "../models/Endereco";           
import TipoEndereco from "../models/enums/TipoEndereco";           
import Cartao from "../models/Cartao";           
import Bandeira from "../models/Bandeira";           
import Telefone from "../models/Telefone";          
import TipoTelefone from "../models/enums/TipoTelefone";

export default class CustomerController {
  private clientes = new Array<Cliente>();

  public renderizarPaginaPrincipal(_: express.Request, res: express.Response): void {
    res.status(200).render("principal");
  }

  public renderizarFormularioClientes(_: express.Request, res: express.Response): void {
    const bandeiras = this.getObjectFromJsonFile("../../src/models/data/bandeiras.json");
    const estados = this.getObjectFromJsonFile("../../src/models/data/estados.json");

    res.status(200).render("clientes", { bandeiras, estados });
  }

  public salvar(req: express.Request, res: express.Response): void {
    try {
      const cliente = this.definirCliente(req);
      this.clientes.push(cliente);
      res.status(201).json({ 
        mensagem: `Cliente ${cliente.nome} criado com sucesso`,
        cliente
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

    if (primeiraSenha !== segundaSenha) {
      throw new Error("As senhas não correspondem");
    }
    this.validarExistencia(email, cpf);

    const cliente: Cliente = new Cliente();
    cliente.setGenero(req.body.genero);
    cliente.setNome(req.body.nome);
    cliente.setSenha(primeiraSenha);
    cliente.setDataDeNascimento(req.body.dataNascimento);
    cliente.setCpf(req.body.cpf);
    cliente.setEmail(req.body.email);

    const pais: Pais = new Pais();
    pais.setNome(req.body.nomePais);
    pais.setSigla(req.body.sigla);

    const endereco: Endereco = new Endereco();
    endereco.setCep(req.body.cep);
    endereco.setNumero(req.body.numero);
    endereco.setComplemento(req.body.complemento);
    endereco.setLogradouro(req.body.logradouro);
    endereco.setTipoLogradouro(req.body.tipoLogradouro);
    endereco.setBairro(req.body.bairro);
    endereco.setFraseCurta(req.body.fraseCurta);
    endereco.setObservacao(req.body.observacoes);
    endereco.setCidade(req.body.cidade);
    endereco.setEstado(req.body.estado);
    endereco.setPais(pais);
    endereco.setTipoEndereco(req.body.tipoEndereco as TipoEndereco);

    const bandeira: Bandeira = new Bandeira();
    bandeira.setDescricao(req.body.bandeira);
    
    const cartao: Cartao = new Cartao();
    cartao.setNumero(req.body.numeroCartao);
    cartao.setNomeImpresso(req.body.nomeImpresso);
    cartao.setCvv(req.body.cvv);
    cartao.setEPreferencial(req.body.ePreferencial === "true");
    cartao.setBandeira(bandeira);

    const telefone: Telefone = new Telefone();  
    telefone.setDdd(req.body.ddd);
    telefone.setNumero(req.body.numeroTelefone);
    telefone.setTipo(req.body.tipoTelefone as TipoTelefone);

    cliente.setUmEndereco(endereco);
    cliente.setUmCartao(cartao);
    cliente.setUmTelefone(telefone);

    return cliente;
  }

  private validarExistencia(email: string, cpf: string): void {
    if (this.clientes.some(((c) => c.email === email)) || this.clientes.some(((c) => c.cpf === cpf))) {
      throw new Error("Este cliente já existe");
    }
  }

  private getObjectFromJsonFile(filePath: string): any {
    const pathToFile = path.resolve(__dirname, filePath);
    return JSON.parse(fs.readFileSync(pathToFile, "utf-8"));
  }
}