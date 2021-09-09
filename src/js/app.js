document.addEventListener('DOMContentLoaded', eventListeners);
const btnBuscarRecomendacion = document.querySelector('#btnBuscarRecomendacion');
const body = document.querySelector('#cuerpo')

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

        listaId.push(contenedor[0].id.replace(/\D/g, ''))
        listaId.push(contenedor[1].id.replace(/\D/g, ''))
        listaId.push(contenedor[2].id.replace(/\D/g, ''))
        listaId.push(contenedor[3].id.replace(/\D/g, ''))
        listaId.push(contenedor[4].id.replace(/\D/g, ''))

        encontrarGeneros(listaId)

        setTimeout(() => {
            limpiarHTML('cuerpo')
            body.innerHTML = `
            <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
            </div>
            `;
        }, 1500);
    } else {
        alert('Neceitas 5 series para poder darte una recomendacion');

    }
}


function encontrarGeneros(listaSeries) {
    let listaGeneros = []

    // listaSeries.forEach(element => {
    fetch('https://kitsu.io/api/edge/anime/' + listaSeries[0] + '/genres')
        .then(res => res.json())
        .then(datos => {
            const listaObtenida = datos.data;
            listaObtenida.forEach(genero => {
                if (genero.attributes.slug != null & genero.attributes.slug != undefined) {
                    let item = genero.attributes.slug
                    listaGeneros.push(item)
                }

            })
        })
        .catch(err => {
            console.log(err);
        })

    fetch('https://kitsu.io/api/edge/anime/' + listaSeries[1] + '/genres')
        .then(res => res.json())
        .then(datos => {
            const listaObtenida = datos.data;
            listaObtenida.forEach(genero => {
                if (genero.attributes.slug != null & genero.attributes.slug != undefined) {
                    let item = genero.attributes.slug
                    listaGeneros.push(item)
                }
            })
        })
        .catch(err => {
            console.log(err);
        })


    fetch('https://kitsu.io/api/edge/anime/' + listaSeries[2] + '/genres')
        .then(res => res.json())
        .then(datos => {
            const listaObtenida = datos.data;
            listaObtenida.forEach(genero => {
                if (genero.attributes.slug != null & genero.attributes.slug != undefined) {
                    let item = genero.attributes.slug
                    listaGeneros.push(item)
                }
            })
        })
        .catch(err => {
            console.log(err);
        })


    fetch('https://kitsu.io/api/edge/anime/' + listaSeries[3] + '/genres')
        .then(res => res.json())
        .then(datos => {
            const listaObtenida = datos.data;
            listaObtenida.forEach(genero => {
                if (genero.attributes.slug != null & genero.attributes.slug != undefined) {
                    let item = genero.attributes.slug
                    listaGeneros.push(item)
                }
            })
        })
        .catch(err => {
            console.log(err);
        })


    setTimeout(() => {
        fetch('https://kitsu.io/api/edge/anime/' + listaSeries[4] + '/genres')
            .then(res => res.json())
            .then(datos => {
                const listaObtenida = datos.data;
                listaObtenida.forEach(genero => {
                    if (genero.attributes.slug != null & genero.attributes.slug != undefined) {
                        let item = genero.attributes.slug
                        listaGeneros.push(item)
                    }
                })
            })
            .then(() => {
                filtrarGeneros(listaGeneros);
            })
            .catch(err => {
                console.log(err);
            })
    }, 3000);
}

let resultado = [];
let listaFinal = ''

function filtrar(value, index, self) {
    if (self.indexOf(value) === index) {
        return index
    } else {
        resultado.push(value)
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function filtrarGeneros(lista) {
    // console.log(lista);
    let nuevaLista = lista.filter(filtrar);
    let listaFinal = resultado.filter(onlyUnique);
    let queryBusqueda = listaFinal[0] + ',' + listaFinal[1] + ',' + listaFinal[2]
        // console.log(nuevaLista);
        // console.log(listaFinal);
        // console.log(queryBusqueda);
    serieRecomendada(queryBusqueda, false)
        // for (let i = 0; i < lista.length; i++) {
        //     for (let j = 1; j < lista.length; j++) {
        //         if (lista[i] != lista[j]) {
        //             nuevaLista.push(lista[j])
        //         } else {
        //             console.log('El genero [' + lista[i] + '] en la posicion ' + i + ' es igual a [' + lista[j] + '] en la posicion ' + j);
        //         }
        //     }
        // }
        // console.log(nuevaLista);
}

function serieRecomendada(query, next) {
    let url = '';
    if (next) {
        url = query
    } else {
        url = 'https://kitsu.io/api/edge/anime?filter[categories]=' + query
    }

    let posiblesSeries = 0
    let siguientePagina = '';
    let recomendacion = ''

    fetch(url)
        .then(res => res.json())
        .then(datos => {
            // console.log(datos);
            if (datos.data.length > 0) {
                const listaSeries = datos.data
                if (datos.links.next != null & datos.links.next != undefined) {
                    siguientePagina = datos.links.next
                } else {
                    siguientePagina = 'no'
                }
                // console.log('antes del forEach ' + Number(listaSeries[0].attributes.startDate.substr(0, 4)));
                listaSeries.forEach(serie => {
                    if (serie.attributes.showType != null & serie.attributes.showType != undefined & serie.attributes.showType === 'TV') {
                        // console.log('en el forEach ' + Number(serie.attributes.startDate.substr(0, 4)));
                        if (serie.attributes.startDate != null & serie.attributes.startDate != undefined) {
                            if (Number(serie.attributes.startDate.substr(0, 4)) > 2008) {
                                posiblesSeries++;
                                recomendacion = serie.id
                            }
                        }

                    }
                })
            }


        })
        .then(() => {
            if (posiblesSeries > 0) {
                if (posiblesSeries < 2) {
                    console.log(posiblesSeries);
                    recomendacion = Math.random() * (1500 - 500) + 500
                    mostrarSerieRecomendada(recomendacion)
                    console.log('La recomendacion tinene una fiabilidad baja')
                } else {
                    console.log(posiblesSeries);
                    mostrarSerieRecomendada(recomendacion)
                }
            } else {
                if (siguientePagina === 'no') {
                    console.log('no se encontro recomendacion');
                } else {
                    serieRecomendada(siguientePagina, true)
                }
            }
        })
        .catch(err => {
            console.log(err);
        })
}

function mostrarSerieRecomendada(id) {
    let url = 'https://kitsu.io/api/edge/anime/' + id
    let mandar = ''
    let imagenFondo = '';
    fetch(url)
        .then(res => res.json())
        .then(datos => {
            let anime = datos.data
                // console.log(anime);
                // console.log(anime.attributes.titles.en_jp);
            mandar = anime.relationships.genres.links.related;

            if (anime.attributes.coverImage != null & anime.attributes.coverImage != undefined) {
                imagenFondo = anime.attributes.coverImage.original;
            } else {
                imagenFondo = './build/img/serie/cover/original.jpg';
            }

            body.innerHTML = `
            <div class="bg-serie">
            <header class="site-header">
                <div class="barra contenedor">
                    <div class="logo">
                        <a href="/">
                            <img src="build/img/logo/Logo.png" alt="Anime">
                            <p>Random<span>Get</span></p>
                        </a>
                    </div>
                    <div class="menu">
                        <nav class="navbar">
                            <a href="/">Inicio</a>
                            <a href="#">¿Como Funciona?</a>
                            <a href="#">Contacto</a>
                        </nav>
                    </div>
                </div>
            </header>
    
    
            <div class="hero">
                <style>
                    .hero {
                        background-image: url('${imagenFondo}');
                    }
                </style>
                <div class="hero-container"></div>
            </div>
    
            <div class="c-serie">
                <div class="c-image">
                    <div class="imagen">
                        <img src="${anime.attributes.posterImage.original}" alt="Cover">
                    </div>
                </div>
    
                <div class="c-info">
                    <div class="c-tabs">
                        <div class="c-resumen">
                            <h2>${anime.attributes.titles.en_jp}</h2>
                            <p>${anime.attributes.synopsis}</p>
                        </div>
                        <div class="c-episodios"></div>
                        <div class="c-personajes"></div>
                        <div class="c-franquisia"></div>
                    </div>
                    <div class="c-generos" id="contenedor-generos">
                        <p>Géneros</p>
                        
                    </div>
                </div>
    
                <div class="c-ficha">
                    <div class="contenedor-ficha">
                        <div class="c-detalles">
                            <h2>Detalles del Anime</h2>
                            <div class="aside-detalles">
                                <p>Inglés: <span>${anime.attributes.titles.en}</span></p>
                                <p>Japonés: <span>${anime.attributes.titles.ja_jp}</p>
                                <p>Japonés (Romaji): <span>${anime.attributes.titles.en_jp}</span></p>
                                <p>Tipo: <span>TV</span></p>
                                <p>Episodios: <span>${anime.attributes.titles.en_jp}</span></p>
                                <p>Estado: <span>${anime.attributes.titles.en_jp}</span></p>
                                <p>Emitido: <span>${anime.attributes.startDate} a ${anime.attributes.endDate}</span></p>
                            </div>
                        </div>
                        <div class="aside-personajes">
                            
                        </div>
                    </div>
                </div>
            </div>
    
        </div>
        <script src="build/js/bundle.min.js" crossorigin="anonymous"></script>
            `;
        })
        .then(() => {
            mostrarGeneros(mandar)
        })
        .catch(err => console.log(err));
}

function mostrarGeneros(url) {
    let listaGeneros = []
    fetch(url)
        .then(res => res.json())
        .then(datos => {
            const generos = datos.data
            generos.forEach(genero => {
                listaGeneros.push(genero.attributes.name)
            })
        })
        .then(() => {
            console.log(listaGeneros);
            const contenedorGeneros = document.querySelector('#contenedor-generos')
            if (listaGeneros.length > 0) {
                listaGeneros.forEach(genero => {
                    const enlace = document.createElement('A');
                    enlace.textContent = genero
                    enlace.setAttribute('href', '#')
                    contenedorGeneros.appendChild(enlace)
                })
            } else {
                const enlace = document.createElement('span');
                enlace.textContent = 'No hay generos para mostrar'
                contenedorGeneros.appendChild(enlace)
            }
        })
        .catch(err => {
            console.log(err);
        })
}

// function obtenerPersonajes(url) {
//     let listaPersonajes = []
//     let contador = 0
//     fetch(url)
//         .then(res => res.json())
//         .then(datos => {
//             const personajes = datos.data;
//             personajes.forEach(personaje => {
//                 if (contador < 4) {
//                     listaPersonajes.push(personaje.relationships.character.links.related)
//                     contador++;
//                 }
//             })
//         })
//         .then(() => {
//             // obtenerImagenesPersonajes(listaPersonajes);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// }

// function obtenerImagenesPersonajes(listaPersonajes) {
//     let urlImagen = []
//     let nombrePersonaje = []
//     let contador = 0;
//     listaPersonajes.forEach(personaje => {
//         fetch(personaje)
//             .then(res => res.json())
//             .then(datos => {
//                 urlImagen.push(datos.data.attributes.image.original)
//                 nombrePersonaje.push(datos.data.attributes.canonicalName)
//             })
//             .then(() => {
//                 const contenedorPersonajes = document.querySelector('#contenedor-personajes')
//                 const divPersonaje = document.createElement('DIV')
//                 `
//                 <div class="miniatura">
//                 <img src="build/img/serie/cover/1.jpg" alt="Personaje">
//                 </div>
//             `
//                 divPersonaje.classList.add('miniatura')
//                 const imagen = document.createElement('IMG')
//                 img.src = urlImagen[contador];
//                 img.setAttribute('alt', nombrePersonaje[contador])

//                 divPersonaje.appendChild(imagen)

//                 contador++;
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     })
// }