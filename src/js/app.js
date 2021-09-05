document.addEventListener('DOMContentLoaded', eventListeners);

function eventListeners() {
    const btnBuscar = document.querySelector('#buscar');
    btnBuscar.addEventListener('click', buscarSerie)

    const listaSeriesAgregadas = document.querySelector('#series-agregadas');

    const inputBuscar = document.querySelector('#busqueda');
    inputBuscar.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            btnBuscar.click();
        }
    });
}

//Objeto con la informacion de la serie
const serieObj = {
    titulo: '',
    imagen: '',
    id: '',
    generos: ''
}

function remoberSerie(e) {
    // document.querySelector(`[data-paso="${idSERIE}"]`);
}


function limpiarHTML(item) {
    const elemento = document.querySelector('#' + item);
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}