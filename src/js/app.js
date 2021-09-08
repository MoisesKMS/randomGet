document.addEventListener('DOMContentLoaded', eventListeners);
const btnBuscarRecomendacion = document.querySelector('#btnBuscarRecomendacion');

function eventListeners() {
    const btnBuscar = document.querySelector('#buscar');
    btnBuscar.addEventListener('click', buscar)

    // const listaSeriesAgregadas = document.querySelector('#series-agregadas');

    const inputBuscar = document.querySelector('#busqueda');
    inputBuscar.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            btnBuscar.click();
        }
    });

    btnBuscarRecomendacion.addEventListener('click', encontrarRecomendacion)
}

function encontrarRecomendacion() {
    const contenedor = document.querySelector('#series-agregadas').children
    let listaId = []
    if (contenedor.length == 5) {
        listaId = []
        for (let i = 0; i < 5; i++) {
            listaId.push(contenedor[i].id.substr(6, contenedor[i].length))
        }
        encontrarGeneros(listaId)
    } else {
        listaId = []
        console.log('Neceitas 5 series para poder darte una recomendacion');
    }
}


function encontrarGeneros(listaSeries) {

    let listaGeneros = []
    let contador = 0
    while (contador < 5) {
        fetch('https://kitsu.io/api/edge/anime/' + listaSeries[0] + '/genres')
            .then(res => res.json())
            .then(datos => {
                const listaObtenida = datos.data;
                listaObtenida.forEach(genero => {
                    listaGeneros.push(genero.attributes.slug)
                })
            })
        contador++;
    }
    console.log(listaGeneros);
}