const baseUrl = 'https://kitsu.io/api/edge/anime?filter[text]=';
let listaSeries = document.querySelector('#resultados');

function buscarSerie() {
    let textoCampo = document.querySelector('#busqueda').value;
    // console.log(textoCampo);
    limpiarHTML('resultados');


    fetch(baseUrl + textoCampo)
        .then(response => response.json())
        .then(data => {
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
                textoTitulo.textContent = serie.attributes.titles.en_jp

                const btnAgregar = document.createElement('A')
                btnAgregar.setAttribute('href', '#')
                btnAgregar.classList.add('btn')
                btnAgregar.classList.add('btn-agregar')

                const iconoBtnAgregar = document.createElement('I')
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