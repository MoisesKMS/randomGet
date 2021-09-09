/**
 * API
 */
const baseUrl = 'https://kitsu.io/api/edge/anime?filter[text]=';
const contenedorResultados = document.querySelector('#resultados');

let listaAnimesAgregados = [];

function limpiarHTML(id) {
    const elemento = document.querySelector('#' + id);
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

function buscar() {
    const textoBuscar = document.querySelector('#busqueda').value;
    // console.log(textoCampo);
    contenedorResultados.innerHTML = `
            <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
            </div>
            `;
    fetch(baseUrl + textoBuscar)
        .then(response => response.json())
        .then(data => {
            const listaAnimes = data.data;
            limpiarHTML('resultados');

            listaAnimes.forEach(serie => {

                const serieEncontrada = document.createElement('DIV')
                serieEncontrada.classList.add('serie-encontrada')

                const imagenSerie = document.createElement('IMG')
                if (serie.attributes.posterImage.original != null & serie.attributes.posterImage.original != undefined) {
                    imagenSerie.src = serie.attributes.posterImage.original
                    imagenSerie.setAttribute('alt', serie.attributes.titles.en_jp)
                }

                const contenidoSerieEncontrada = document.createElement('DIV')
                contenidoSerieEncontrada.classList.add('contenido-serie-encontrada')

                let textoTitulo = document.createElement('P')
                let nombreSerie = ''
                try {
                    if (serie.attributes.titles.en_jp != null & serie.attributes.titles.en_jp != undefined) {
                        nombreSerie = serie.attributes.titles.en_jp;
                        textoTitulo.textContent = nombreSerie
                            // if (nombreSerie.length > 40) {
                            //     textoTitulo.textContent = nombreSerie.substr(0, 39) + '...'
                            // }
                    }
                } catch (error) {
                    console.log(error);
                }

                const btnAgregar = document.createElement('button')
                btnAgregar.classList.add('btn')
                btnAgregar.classList.add('btn-agregar')
                btnAgregar.setAttribute('type', 'button')
                btnAgregar.setAttribute('id', Number(serie.id))
                    // btnAgregar.onclick = addSerie();
                btnAgregar.onclick = addSerie

                const iconoBtnAgregar = document.createElement('I')
                    // iconoBtnAgregar.addEventListener('click', agregarSerie)
                iconoBtnAgregar.classList.add('fas')
                iconoBtnAgregar.classList.add('fa-plus-square')

                btnAgregar.textContent = 'Agregar '
                btnAgregar.appendChild(iconoBtnAgregar)

                serieEncontrada.dataset.animeId = Number(serie.id)

                contenidoSerieEncontrada.appendChild(textoTitulo)
                contenidoSerieEncontrada.appendChild(btnAgregar)
                serieEncontrada.appendChild(imagenSerie)
                serieEncontrada.appendChild(contenidoSerieEncontrada)

                contenedorResultados.appendChild(serieEncontrada)

                // console.log(serie.relationships.genres.links.related);
                // console.log(listaSeries)
                // console.log(Number(serie.id))
                // console.log(serie.attributes.titles.en_jp)
                // console.log(serie.attributes.posterImage.original)
            })



        })
        .catch(err => console.log(err));
}




function addSerie(e) {


    let tipo = e.path
    const contenedor = document.querySelector('#series-agregadas').children

    // console.log(tipo[0].id);
    if (contenedor.length < 5) {
        if (tipo[0].id != '') {

            agregarSerie(e.path[0].id, e.path[1].firstChild.textContent, e.path[2].firstChild.src)
            listaAnimesAgregados.push(e.path[0].id)

        } else {

            agregarSerie(e.path[1].id, e.path[2].firstChild.textContent, e.path[3].firstChild.src)
            listaAnimesAgregados.push(e.path[1].id)
        }
    } else {
        console.log('maximo alcanzado');
        alert('maximo de series alcanzado, presiona Encontrar recomendacion')
    }


}


function agregarSerie(id, nombre, img) {
    const contenedorSeries = document.querySelector('#series-agregadas');

    const contenedorSerie = document.createElement('DIV');
    contenedorSerie.classList.add('serie-agregada');
    contenedorSerie.id = 'serie-' + id;

    const imagen = document.createElement('IMG');
    imagen.setAttribute('alt', nombre);
    imagen.src = img

    const contenidoSerieAgregada = document.createElement('DIV')
    contenidoSerieAgregada.classList.add('contenido-serie-agregada')

    const titulo = document.createElement('H2');
    titulo.textContent = nombre;

    const btnEliminar = document.createElement('BUTTON');
    btnEliminar.classList.add('btn', 'btn-borrar')
    btnEliminar.setAttribute('type', 'button')
        // btnEliminar.onclick = removeSerie

    const icono = document.createElement('I')
    icono.classList.add('fas', 'fa-trash-alt')

    btnEliminar.appendChild(icono)
    contenidoSerieAgregada.appendChild(titulo)
    contenidoSerieAgregada.appendChild(btnEliminar)

    contenedorSerie.appendChild(imagen)
    contenedorSerie.appendChild(contenidoSerieAgregada)


    contenedorSeries.appendChild(contenedorSerie);
}

// function removeSerie(e) {
//     let tipo = e.path
//     const contenedor = document.querySelector('#series-agregadas')
//         // console.log(tipo[3].id.includes('serie-'));
//     if (tipo[3].id.includes('serie-')) {
//         contenedor.removeChild(tipo[3])
//             // console.log(tipo[3].id);
//     } else {
//         contenedor.removeChild(tipo[2])
//             // console.log(tipo[2].id);
//     }
// }




/* * 
 * Utilidades
 */