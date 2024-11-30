export function adicionarHref(event, path, isInsideClientRoute, isEdicaoCliente) {
    if (!isInsideClientRoute) {
        const tr = event.target.closest('tr');
        const idCliente = tr.id;
        window.location.href = isEdicaoCliente ? `${path}/${idCliente}/editar` : `${path}/${idCliente}/`;
    } else {
        const tr = event.target.closest('tr');
        const idCliente = tr.id;
        window.location.href = `clientes/${idCliente}/${path}`;
    }
}
