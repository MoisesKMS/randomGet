const baseUrl = 'https://kitsu.io/api/edge/anime?filter[text]=';
let listaSeries = document.querySelector('#resultados');

function agregarSerie(id, nombre, urlImagen) {

    const contenedorSerieAgregada = document.createElement('DIV');
    contenedorSerieAgregada.classList.add('serie-agregada');
    contenedorSerieAgregada.dataset.serieId = id

    const imagenSerie = document.createElement('IMG')
    imagenSerie.src = urlImagen
    imagenSerie.setAttribute('alt', nombre)

    const contenidoSerieAgregada = document.createElement('DIV')
    contenidoSerieAgregada.classList.add('contenido-serie-agregada')

    const tituloSerie = document.createElement('H2')
    tituloSerie.textContent = nombre

    const btnBorrar = document.createElement('A')
    btnBorrar.setAttribute('href', '#')
    btnBorrar.classList.add('btn')
    btnBorrar.classList.add('btn-borrar')

    const iconoBorrar = document.createElement('I')
    iconoBorrar.classList.add('fas')
    iconoBorrar.classList.add('fa-trash-alt')

    btnBorrar.appendChild(iconoBorrar)
    contenidoSerieAgregada.appendChild(tituloSerie)
    contenidoSerieAgregada.appendChild(btnBorrar)

    contenedorSerieAgregada.appendChild(imagenSerie)
    contenedorSerieAgregada.appendChild(contenidoSerieAgregada)

    listaSeriesAgregadas.appendChild(contenidoSerieAgregada)
}

async function buscarSerie() {
    let textoCampo = document.querySelector('#busqueda').value;
    // console.log(textoCampo);
    listaSeries.innerHTML = `
            <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
            </div>
            `;

    await fetch(baseUrl + textoCampo)
        .then(response => response.json())
        .then(data => {
            limpiarHTML('resultados');
            let listaAnimes = data.data;
            listaAnimes.forEach(serie => {
                const serieEncontrada = document.createElement('DIV')
                serieEncontrada.classList.add('serie-encontrada')

                const imagenSerie = document.createElement('IMG')
                imagenSerie.src = serie.attributes.posterImage.original
                imagenSerie.setAttribute('alt', serie.attributes.titles.en_jp)

                const contenidoSerieEncontrada = document.createElement('DIV')
                contenidoSerieEncontrada.classList.add('contenido-serie-encontrada')

                const textoTitulo = document.createElement('P')
                textoTitulo.textContent = serie.attributes.titles.en_jp.substr(0, 50)
                if (serie.attributes.titles.en_jp.length > 50) {
                    textoTitulo.textContent = textoTitulo.textContent + '...'
                }

                const btnAgregar = document.createElement('A')
                btnAgregar.setAttribute('href', '#')
                btnAgregar.classList.add('btn')
                btnAgregar.classList.add('btn-agregar')

                const iconoBtnAgregar = document.createElement('I')
                iconoBtnAgregar.addEventListener('click', agregarSerie)
                iconoBtnAgregar.classList.add('fas')
                iconoBtnAgregar.classList.add('fa-plus-square')

                btnAgregar.textContent = 'Agregar '
                btnAgregar.appendChild(iconoBtnAgregar)

                serieEncontrada.dataset.animeId = Number(serie.id)

                contenidoSerieEncontrada.appendChild(textoTitulo)
                contenidoSerieEncontrada.appendChild(btnAgregar)
                serieEncontrada.appendChild(imagenSerie)
                serieEncontrada.appendChild(contenidoSerieEncontrada)

                listaSeries.appendChild(serieEncontrada)

                // console.log(listaSeries)
                // console.log(Number(serie.id))
                // console.log(serie.attributes.titles.en_jp)
                // console.log(serie.attributes.posterImage.original)
            })



        })
        .catch(err => console.log(err));
}