import path from "path";
import fs from "fs";

export default function jsonParaObjeto(caminho: string): any {
    const caminhoArquivo = path.resolve(__dirname, caminho);
    return JSON.parse(fs.readFileSync(caminhoArquivo, "utf-8"));
}