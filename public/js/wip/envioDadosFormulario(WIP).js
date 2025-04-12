document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form.container');
    const submitButton = form.querySelector('button[type="submit"]');

    submitButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const body = coletarDadosCamposGerais(form);

        const campoData = form.querySelector("#date-field");
        body[campoData.getAttribute("data-content")] = campoData.value.trim();

        console.log(body);

        const idCliente = form.getAttribute("data-cliente-id");

        // const response = await fetch(`/clientes/${idCliente}`, {
        //     method: "PUT",
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(body),
        // });

        // if (response) {
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'Dados do cliente atualizados com sucesso!',
        //         showConfirmButton: false,
        //         timer: 1500
        //     });
        // }
    });
});

function coletarDadosCamposGerais(form) {
    const data = {};

    form.querySelectorAll('#normal-field').forEach((field) => {
        if (field.getAttribute("data-content") === "telefone") {
            const dddRegex = /\((\d+)\)/;
            data.ddd = field.textContent.replace(/\s+/g, '').trim().match(dddRegex)[1];
            data.numeroTelefone = field.textContent.replace(/\s+/g, '').trim().split(')')[1];
        } else {
            data[field.getAttribute("data-content")] = field.textContent.trim();
        }
    });

    form.querySelectorAll("#dropdown-field").forEach(field => {
        const options = field.querySelectorAll('option');

        options.forEach(option => {
            if (option.selected) {
                data[field.getAttribute("data-content")] = option.textContent.trim();
            }
        });
    });

    return data;
}