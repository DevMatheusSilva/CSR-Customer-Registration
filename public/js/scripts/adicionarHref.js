export function adicionarHref(event, path) {
    const tr = event.target.closest('tr');
    const idCliente = tr.id;
    window.location.href = `${path}/${idCliente}`;
}
