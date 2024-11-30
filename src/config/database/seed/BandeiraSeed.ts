import {DataSource} from "typeorm";
import Bandeira from "../../../entities/Bandeira";
import {BANDEIRAS} from "../../../utils/constantes";

export default class BandeiraSeed {
    public static async executar(dataSource: DataSource) {
        const bandeiraRepository = dataSource.getRepository(Bandeira);

        const dadosExistentes = await bandeiraRepository.count({}) > 0;
        if (dadosExistentes) {
            console.log("Seed de bandeiras já executado. Nenhuma ação necessária.");
            return;
        }

        console.log("Executando seeds...");
        await bandeiraRepository.save(
            BANDEIRAS.map(bandeira => new Bandeira(bandeira.name, bandeira.code))
        );
        console.log("Seeds executadas com sucesso");
    }
}