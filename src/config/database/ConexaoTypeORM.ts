import { DataSource } from "typeorm";

export default class ConexaoTypeORM {
  static async conectar(dataSource: DataSource): Promise<void> {
    try {
      console.log("Estabelecendo conexão com o banco de dados...");
      await dataSource.initialize();
      console.log("Conexão com o banco de dados estabelecida com sucesso!");
    } catch (error) {
      const mensagemErro = `Erro ao inicializar a base de dados: ${error}`
      throw new Error (mensagemErro);
    }
  }
}