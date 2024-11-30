import IStrategy from "../../IStrategy";
import Cartao from "../../../entities/Cartao";
import BandeiraDAO from "../../../daos/impls/BandeiraDAO";
import {postgresDataSource} from "../../../config/database/dataSources/postgresDataSource";

export default class DefinirBandeira implements IStrategy {
    async processar(cartao: Cartao) {
        const bandeira = await new BandeiraDAO(postgresDataSource).getBandeiraByCode(cartao.bandeiraCode);
        if (!bandeira) {
            throw new Error("Bandeira não encontrada");
        }
        cartao.bandeira = bandeira;
    }
}