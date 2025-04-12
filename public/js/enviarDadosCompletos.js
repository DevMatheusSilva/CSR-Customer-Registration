document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const submitButton = form.querySelector('[type="submit"]');

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const dataToSend = {
            enderecos: [],
            cartoes: []
        };

        formData.forEach((value, key) => {
            if (key.startsWith('enderecos')) {
                const match = key.match(/enderecos\[(\d+)]\[(.+)]/);
                if (match) {
                    const index = parseInt(match[1], 10);
                    const field = match[2];

                    if (!dataToSend.enderecos[index]) {
                        dataToSend.enderecos[index] = {};
                    }

                    dataToSend.enderecos[index][field] = value;
                }
            } else if (key.startsWith('cartoes')) {
                const match = key.match(/cartoes\[(\d+)]\[(.+)]/);
                if (match) {
                    const index = parseInt(match[1], 10);
                    const field = match[2];

                    if (!dataToSend.cartoes[index]) {
                        dataToSend.cartoes[index] = {};
                    }

                    dataToSend.cartoes[index][field] = value;
                }
            } else {
                dataToSend[key] = value;
            }
        });

        fetch(form.action, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
            .then(async (response) => {
                if (response.ok) {
                    const idCliente = form.getAttribute('data-clienteId');
                    window.location.href = `http://localhost:3000/clientes/${idCliente}`;
                } else {
                    const errorResponse = await response.json();
                    const errorMessage = errorResponse.message;
                    Swal.fire('Erro', errorMessage, 'error');
                }
            })
            .catch((error) => {
                console.error('Erro ao enviar dados:', error);
                Swal.fire('Erro', error.message || 'Erro ao enviar dados.', 'error');
            });
    });
});
