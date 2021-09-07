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


function encontrarGeneros(id) {
    let listaGeneros = id
    for (let i = 0; i < listaGeneros.length; i++) {
        generosAPI('https://kitsu.io/api/edge/anime/' + listaGeneros[i] + '/genres')
    }

}

async function generosAPI(id) {
    let listaGenerosF = []
    await fetch(id)
        .then(response => response.json())
        .then(data => {
            const listaGeneros = data.data;

            listaGeneros.forEach(genero => {
                // console.log(genero.attributes.slug);
                listaGenerosF.push(genero.attributes.slug)
            });

            console.log(listaGenerosF);
        })
        .catch(err => console.log(err));
}