import inativarCliente from './scripts/inativarCliente.js';
import {adicionarHref} from './scripts/adicionarHref.js';

document.querySelectorAll('#deletar-cliente').forEach(button => {
    button.addEventListener('click', async (event) => {
        inativarCliente(event);
    });
});

document.querySelectorAll("#editar-cliente").forEach(button => {
    button.addEventListener('click', (event) => {
        adicionarHref(event, '/clientes', false, true);
    });
});

document.querySelectorAll("#editar-endereco").forEach(button => {
    button.addEventListener('click', (event) => {
        adicionarHref(event, 'enderecos/editar', true, false);
    });
});

document.querySelectorAll("#adicionar-endereco").forEach(button => {
    button.addEventListener('click', (event) => {
        adicionarHref(event, 'enderecos/registrar', true, false);
    });
});

document.querySelectorAll("#adicionar-cartao").forEach(button => {
    button.addEventListener('click', (event) => {
        adicionarHref(event, 'cartoes/registrar', true, false);
    });
});

document.querySelectorAll("#visualizar-cliente").forEach(button => {
    button.addEventListener('click', (event) => {
        adicionarHref(event, '/clientes', false, false);
    });
});

document.querySelectorAll("#alterar-senha").forEach(button => {
    button.addEventListener('click', (event) => {
        adicionarHref(event, 'usuarios/alterarSenha', true, false);
    });
});

document.querySelectorAll("#filtrar").forEach(button => {
    button.addEventListener('click', (event) => {
        const formularioFiltro = document.querySelector("#formulario-filtro");
        if (formularioFiltro) {
            formularioFiltro.style.display = 'block';
        }
    });
});