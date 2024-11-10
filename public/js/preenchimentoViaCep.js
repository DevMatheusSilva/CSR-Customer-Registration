const cepInput = document.querySelector("#cep");
const cidadeInput = document.querySelector("#cidade");
const estadoInput = document.querySelector("#estado");
const paisInput = document.querySelector("#nomePais");
const siglaInput = document.querySelector("#sigla");
const logradouro = document.querySelector("#logradouro");
const tipoLogradouro = document.querySelector("#tipoLogradouro");
const bairro = document.querySelector("#bairro");

function limpaFormulario() {
    cidadeInput.value = "";
    estadoInput.value = "";
    paisInput.value = "";
    siglaInput.value = "";
}

function atualizarCampos(conteudo) {
    if (!("erro" in conteudo)) {
        cidadeInput.value = conteudo.localidade;
        for (const option of estadoInput.options) {
            if (option.value === conteudo.uf) {
                option.selected = true;
                break;
            }
        }
        if (conteudo.logradouro) {
            logradouro.value = conteudo.logradouro;
            for (const option of tipoLogradouro.options) {
                if (conteudo.logradouro.split(" ")[0].toUpperCase() === option.value) {
                    option.selected = true;
                    break;
                }
            }
        }
        if (conteudo.bairro) {
            bairro.value = conteudo.bairro;
        }
        paisInput.value = "Brasil";
        siglaInput.value = "BR";
    }
}

cepInput.addEventListener("focusout", async () => {
    const cep = cepInput.value.replace(/\D/g, "");
    if (cep) {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        atualizarCampos(data);
    } else {
        console.error("CEP inválido");
    }
});