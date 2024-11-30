document.addEventListener('DOMContentLoaded', () => {
    let enderecoCount = 1; // Contador para endereços
    let cartaoCount = 1; // Contador para cartões

    // Função para adicionar nova div de endereço
    const addEnderecoHandler = (event) => {
        enderecoCount++;

        // Clona a div existente
        const originalEndereco = event.target.closest('.enderecoContainer');
        const newEndereco = originalEndereco.cloneNode(true);

        // Atualiza os atributos e textos do novo endereço
        updateFields(newEndereco, 'enderecos', enderecoCount, 'indiceEndereco');

        // Insere a nova div logo após a original
        originalEndereco.insertAdjacentElement('afterend', newEndereco);

        // Remove o botão "Adicionar" da div original
        event.target.remove();
    };

    // Função para adicionar nova div de cartão
    const addCartaoHandler = (event) => {
        cartaoCount++;

        // Clona a div existente
        const originalCartao = event.target.closest('.cartaoContainer');
        const newCartao = originalCartao.cloneNode(true);

        // Atualiza os atributos e textos do novo cartão
        updateFields(newCartao, 'cartoes', cartaoCount, 'indiceCartao');

        // Insere a nova div logo após a original
        originalCartao.insertAdjacentElement('afterend', newCartao);

        // Remove o botão "Adicionar" da div original
        event.target.remove();
    };

    // Função para atualizar os atributos dos campos clonados
    const updateFields = (container, prefix, count, indexClass) => {
        // Atualiza o índice no título
        const indiceSpan = container.querySelector(`.${indexClass}`);
        indiceSpan.textContent = count;

        // Atualiza os campos name e id
        container.querySelectorAll('input, select').forEach((input) => {
            const name = input.getAttribute('name');
            const id = input.getAttribute('id');
            if (name) input.setAttribute('name', name.replace(/\[\d+\]/, `[${count - 1}]`));
            if (id) input.setAttribute('id', id.replace(/\d+$/, count - 1));
        });

        // Remove o botão "Adicionar" da div clonada
        const addButton = container.querySelector('button');
        if (addButton) addButton.remove();

        // Cria um novo botão "Adicionar" para a div clonada
        const newButton = document.createElement('button');
        newButton.type = 'button';
        newButton.className = `add${capitalize(prefix)}Button bg-lighter-default text-font-default p-2 rounded-2xl shadow w-32 mt-5`;
        newButton.innerHTML = '<i class="fa fa-add"></i>';

        // Define o evento do novo botão
        if (prefix === 'enderecos') {
            newButton.addEventListener('click', addEnderecoHandler);
        } else if (prefix === 'cartoes') {
            newButton.addEventListener('click', addCartaoHandler);
        }

        // Adiciona o botão à nova div
        const buttonContainer = container.querySelector('.flex.justify-center.items-center');
        if (buttonContainer) {
            buttonContainer.appendChild(newButton);
        }
    };

    // Função para capitalizar strings
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    // Inicializa os botões nas divs iniciais
    document.querySelector('.addEnderecoButton').addEventListener('click', addEnderecoHandler);
    document.querySelector('.addCartaoButton').addEventListener('click', addCartaoHandler);
});
