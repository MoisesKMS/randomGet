document.addEventListener('DOMContentLoaded', eventListeners);

function eventListeners() {
    const btnBuscar = document.querySelector('#buscar');
    btnBuscar.addEventListener('click', buscarSerie)

    const inputBuscar = document.querySelector('#busqueda');
    inputBuscar.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            btnBuscar.click();
        }
    });
}



function limpiarHTML(item) {
    const ELEMENTO = document.querySelector('#' + item);
    while (ELEMENTO.firstChild) {
        ELEMENTO.removeChild(ELEMENTO.firstChild);
    }
}