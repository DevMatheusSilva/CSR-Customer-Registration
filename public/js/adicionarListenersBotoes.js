import inativarCliente from './scripts/inativarCliente.js';
import {adicionarHref} from './scripts/adicionarHref.js';

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