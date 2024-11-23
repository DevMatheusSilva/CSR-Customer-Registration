import inativarCliente from './scripts/inativarCliente.js';
import {adicionarHref, tornarParagrafoEditavel} from "./scripts/editarDados.js";

document.querySelectorAll('#deletar-cliente').forEach(button => {
    button.addEventListener('click', async (event) => {
        inativarCliente(event);
    });
});

document.querySelectorAll("#editar-cliente").forEach(button => {
    button.addEventListener('click', (event) => {
        adicionarHref(event, '/clientes');
    });
});

document.querySelectorAll("#editar-endereco").forEach(button => {
    button.addEventListener('click', (event) => {
        adicionarHref(event, '/enderecos');
    });
});

document.querySelectorAll("#editar-campo").forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        tornarParagrafoEditavel(event);
    });
});