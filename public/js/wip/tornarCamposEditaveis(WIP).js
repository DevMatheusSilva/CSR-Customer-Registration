export function tornarParagrafoEditavel(event) {
    const container = event.target.closest('.flex');
    if (container) {
        const p = container.querySelectorAll('p');
        if (p) {
            p.forEach(element => {
                estilizarCampoEditavel(container, element);
            });
        }
    }
}

function estilizarCampoEditavel(container, element) {
    if (!element.dataset.originalValue) {
        element.dataset.originalValue = element.textContent;
    }

    element.setAttribute('contenteditable', 'true');
    element.focus();
    container.classList.add("bg-mid-default", "p-3");

    element.addEventListener('blur', () => {
        element.textContent = element.textContent.trim().replaceAll('\n', '');
        element.setAttribute('contenteditable', 'false');
        container.classList.remove("bg-mid-default", "p-3");

        element.textContent !== element.dataset.originalValue.replaceAll('\n', '') ?
            element.classList.add("text-font-default") :
            element.classList.remove("text-font-default");
    }, {once: true});
}