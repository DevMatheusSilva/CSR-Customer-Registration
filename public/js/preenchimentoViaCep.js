const cepInput = document.querySelector("#cep");
const cidadeInput = document.querySelector("#cidade");
const estadoInput = document.querySelector("#estado");
const paisInput = document.querySelector("#nomePais");
const siglaInput = document.querySelector("#sigla");
const logradouroInput = document.querySelector("#logradouro");
const tipoLogradouroInput = document.querySelector("#tipoLogradouro");
const bairroInput = document.querySelector("#bairro");

function verificarDropdowns(options, valor) {
    for (const option of options) {
        if (option.value.toUpperCase().includes(valor.toUpperCase())) {
            option.selected = true;
            break;
        }
    }
}

function limparCampos() {
    cidadeInput.value = "";
    estadoInput.value = "";
    paisInput.value = "";
    siglaInput.value = "";
    logradouroInput.value = "";
    tipoLogradouroInput.value = "";
    bairroInput.value = "";
}

function atualizarCampos(conteudo) {
    const PAIS_DEFAULT = "Brasil";
    const SIGLA_DEFAULT = "BR";

    if (!("erro" in conteudo)) {
        cidadeInput.value = conteudo.localidade;
        verificarDropdowns(estadoInput.options, conteudo.uf);

        if (conteudo.logradouro) {
            logradouroInput.value = conteudo.logradouro;
            verificarDropdowns(tipoLogradouroInput.options, conteudo.logradouro.split(" ")[0]);
        }

        if (conteudo.bairro) {
            bairroInput.value = conteudo.bairro;
        }

        paisInput.value = PAIS_DEFAULT;
        siglaInput.value = SIGLA_DEFAULT;
    } else {
        limparCampos();
        Swal.fire({
            title: "CEP não encontrado",
            text: "Por favor, digite um CEP válido",
            icon: "error",
            color: "#03A696",
            background: "#3f4b4b",
            backdrop: "rgba(35,41,41,0.8)",
            confirmButtonColor: "#253659",
            confirmButtonText: "Fechar",
        });
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