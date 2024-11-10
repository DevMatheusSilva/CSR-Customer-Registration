document.querySelectorAll('#deletar-cliente').forEach(button => {
    button.addEventListener('click', async (event) => {
        const tr = event.target.closest('tr');
        const nomeCliente = tr.getAttribute('data-nome');

        const confirmacaoDelecao = await Swal.fire({
            title: 'Confirmação de Exclusão',
            text: `Deseja realmente inativar ${nomeCliente}?`,
            color: '#03A696',
            confirmButtonColor: "#253659",
            cancelButtonColor: "#BF665E",
            background: '#3f4b4b',
            backdrop: 'rgba(35,41,41,0.8)',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, inativar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmacaoDelecao.isConfirmed) {
            const response = await fetch(`/clientes/${tr.id}`, {
                method: 'DELETE',
            });
            if (response.status === 204) {
                window.location.reload();
            } else {
                console.error("Erro ao deletar o cliente");
            }
        }
    });
});