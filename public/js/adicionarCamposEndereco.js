document.addEventListener('DOMContentLoaded', () => {
    let enderecoCount = document.querySelectorAll('.enderecoContainer').length;

    const addEnderecoHandler = (event) => {
        enderecoCount++;

        const originalEndereco = event.target.closest('.enderecoContainer');
        const newEndereco = originalEndereco.cloneNode(true);

        updateFields(newEndereco, 'enderecos', enderecoCount, 'indiceEndereco');

        originalEndereco.insertAdjacentElement('afterend', newEndereco);

        event.target.remove();
    };

    const updateFields = (container, prefix, count, indexClass) => {
        const indiceSpan = container.querySelector(`.${indexClass}`);
        indiceSpan.textContent = count;

        container.querySelectorAll('input, select').forEach((input) => {
            const name = input.getAttribute('name');
            const id = input.getAttribute('id');
            if (name) input.setAttribute('name', name.replace(/\[\d+\]/, `[${count - 1}]`));
            if (id) input.setAttribute('id', id.replace(/_\d+$/, `_${count - 1}`));
            if (input.tagName === 'INPUT') input.value = '';
        });

        const addButton = container.querySelector('button');
        if (addButton) addButton.remove();

        const newButton = document.createElement('button');
        newButton.type = 'button';
        newButton.className = `add${capitalize(prefix)}Button bg-lighter-default text-font-default p-2 rounded-2xl shadow w-32 mt-5`;
        newButton.innerHTML = '<i class="fa fa-add"></i>';
        newButton.addEventListener('click', addEnderecoHandler);

        const buttonContainer = container.querySelector('.flex.justify-center.items-center');
        if (buttonContainer) {
            buttonContainer.appendChild(newButton);
        }
    };

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const addButton = document.querySelector('.addEnderecoButton');
    if (addButton) {
        addButton.addEventListener('click', addEnderecoHandler);
    }
});
