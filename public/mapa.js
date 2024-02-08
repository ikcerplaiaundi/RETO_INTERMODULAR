
function generarMapa() {

    //borro todo
    //document.body.innerHTML = "";
    // crea el boton para cerrar serion
    generarLogout();


    //Genera logo//////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Crear un nuevo elemento de imagen
    var logo = document.createElement('img');

    // Establecer la ruta de la imagen
    logo.src = 'public/logo.png'; // Reemplaza 'ruta/al/logo.png' con la ruta de tu logo

    // Establecer el tamaño del logo
    logo.style.width = '40px';
    logo.style.height = '40px';

    // Establecer la posición fija (fixed) en la esquina superior derecha
    logo.style.position = 'fixed';
    logo.style.top = '15px';
    logo.style.right = '15px';

    generarAyuda();
    // Agregar el logo al cuerpo del documento
    document.body.appendChild(logo);


    // Crear el elemento div que tendra el mapa//////////////////////////////////////////////////////////////////////////
    var mapDiv = document.createElement('div');

    // Establecer los atributos del div
    mapDiv.id = 'mapid';


    // Agregar el div al cuerpo de la página
    document.body.appendChild(mapDiv);


    setTimeout(() => {
        //mapa y peticiones
        var map = L.map('mapid').setView([43.34567, -1.79690], 8);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        var urlActual = (new URL(window.location.origin)).hostname;
        let token = sessionStorage.getItem('accessToken');
        fetch("http://" + urlActual + ":8082/api/auth/municipios", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json; charset=UTF-8"

            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("La solicitud no se pudo completar correctamente.");
                }
                return response.json();
            })
            .then(dataMunicipios => {

                // Convertir el array de provincias a cadena JSON
                var municipiosJSON = JSON.stringify(dataMunicipios);



                // Guardar la cadena JSON en el almacenamiento de sesión
                sessionStorage.setItem('municipios', municipiosJSON);
                //REgenerar cartas del la vez anterior
                regenerarCartas();

                // Llamar a la función para generar el formulario

                if (typeof generarGrafico === 'function') {
                    generarGrafico();
                } else {

                    console.error("La función generarGrafico no está definida.");
                }


                dataMunicipios.forEach(municipio => {


                    // Crear una nueva carta
                    let nuevaCarta = document.createElement('div');
                    nuevaCarta.setAttribute("id", municipio.NOMBRE)
                    nuevaCarta.classList.add('cartas'); // Agregar la clase cartas

                    // Contenido de la carta
                    let titulo = document.createElement('h2');
                    titulo.textContent = municipio.NOMBRE;

                    let contenido = document.createElement('div');
                    let parrafo = document.createElement('p');
                    parrafo.textContent = 'Humedad Relativa: ' + municipio.humedad_relativa;
                    contenido.appendChild(parrafo);

                    parrafo = document.createElement('p');
                    parrafo.textContent = 'Orto: ' + municipio.orto;
                    contenido.appendChild(parrafo);

                    parrafo = document.createElement('p');
                    parrafo.textContent = 'Ocaso: ' + municipio.ocaso;
                    contenido.appendChild(parrafo);

                    parrafo = document.createElement('p');
                    parrafo.textContent = 'Precipitación: ' + municipio.precipitacion;
                    contenido.appendChild(parrafo);

                    parrafo = document.createElement('p');
                    parrafo.textContent = 'Temperatura Mínima: ' + municipio.temperatura_min;
                    contenido.appendChild(parrafo);

                    parrafo = document.createElement('p');
                    parrafo.textContent = 'Temperatura Máxima: ' + municipio.temperatura_max;
                    contenido.appendChild(parrafo);

                    descripcion = document.createElement('p');


                    // Agregar elementos a la carta
                    nuevaCarta.appendChild(titulo);
                    nuevaCarta.appendChild(contenido);
                    nuevaCarta.appendChild(descripcion);
                    // Asignar eventos de arrastre y soltado a la carta
                    nuevaCarta.setAttribute('draggable', true);
                    nuevaCarta.addEventListener('dragstart', comenzarArrastre);
                    nuevaCarta.addEventListener('dragend', soltarCarta);

                    //maracadores
                    let marker = L.marker([municipio.LATITUD_ETRS89_REGCAN95, municipio.LONGITUD_ETRS89_REGCAN95]).addTo(map);
                    marker._icon.classList.add("huechange");
                    marker._icon.id = "provincias/" + municipio.CODPROV + "/municipios/" + municipio.CODIGOINE.substring(0, 5);

                    marker.bindTooltip(municipio.NOMBRE, {
                        permanent: false,    // El tooltip no será permanente
                        //direction: 'top',    // Se mostrará encima del marcador
                        offset: L.point(-10, 30) // Desplazamiento del tooltip respecto al marcador

                    })
                    marker.on('click', function () {
                        const options = {
                            method: 'GET',
                            headers: {
                                Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXJAcGxhaWF1bmRpLm5ldCJ9.YPY77vtxLZDsm35Ho_-M9HcW0KmLhLJMsaPmmDsV0d2PfFKyTI5vHhrS8Ib62azMxcRpo_88_V6RuMLalWP7RT-gbCBxfLuKqGaK91AvFvv62nATf1suvuBg0H7FA3pEuvMfY20bUYwPMrfaBrUkmDlIL0jl3ogSKEIQzhjnwRoluW534S27xcHtdhD_akQGYFFjt9gwzvdyhSkvxKKKQPGYBK8dVuNTdGX2hBRnuVr9evZ4zWlqg448EBPdMg4DYv0aTAg7A-acWB3PEOlwBPeyBzDzUua9SBk7g9lgjn1MMHOs0qN0mopR380RXMHiM0yO1VO9fNRSsqW2Ne-e_w',
                                'Content-Type': 'application/json; charset=utf-8'
                            }
                        };
                        fechaAyer = new Date;
                        fechaManana = new Date;
                        fechaAyer.setDate(fechaAyer.getDate() - 1);
                        fechaManana.setDate(fechaManana.getDate() + 1);
                        let zone = "";
                        switch (municipio.NOMBRE_PROVINCIA) {
                            case "Gipuzkoa":
                                zone = "donostialdea";
                                break;
                            case "Bizkaia":
                                zone = "cantabrian_mountains"
                                break;
                            case "Araba/Álava":
                                zone = "ebro_valley";
                                break;

                            default:
                                break;
                        }

                        fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/` + zone + `/forecast/at/` + formatoFecha1(fechaAyer) + `/for/` + formatoFecha2(fechaManana), options)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error("La solicitud meteorológica no se pudo completar correctamente.");
                                }

                                return response.arrayBuffer();
                                //return response.json();
                            })
                            .then(data => {
                                const decoder = new TextDecoder('iso-8859-1');
                                //console.log("cantabrian_valleys/forecast/at/" + marker._icon.id);
                                const text = decoder.decode(data);
                                dataMeteo = JSON.parse(text);

                                console.log(municipio);
                                descripcion.textContent = dataMeteo.forecastTextByLang.SPANISH;
                                descripcion.setAttribute('id', 'descripcion');
                                nuevaCarta.appendChild(descripcion);
                                marker.bindPopup(nuevaCarta); //Abiertos

                            })
                        console.log('Click en ' + municipio.NOMBRE);
                    })

                });
            })
    }, 100);

};

function formatoFecha2(fecha) {
    let año = fecha.getFullYear(); // Obtiene el año (ej. 2022)
    let mes = fecha.getMonth() + 1; // Obtiene el mes (0-11) y se suma 1 para obtener el mes real
    let dia = fecha.getDate(); // Obtiene el día del mes

    // Asegurarse de que el mes y el día tengan dos dígitos
    mes = mes < 10 ? '0' + mes : mes;
    dia = dia < 10 ? '0' + dia : dia;

    return `${año}${mes}${dia}`;
}

function formatoFecha1(fecha) {
    let año = fecha.getFullYear(); // Obtiene el año (ej. 2022)
    let mes = fecha.getMonth() + 1; // Obtiene el mes (0-11) y se suma 1 para obtener el mes real
    let dia = fecha.getDate(); // Obtiene el día del mes

    // Asegurarse de que el mes y el día tengan dos dígitos
    mes = mes < 10 ? '0' + mes : mes;
    dia = dia < 10 ? '0' + dia : dia;

    // Formatea la fecha como "YYYY/MM/DD"
    return `${año}/${mes}/${dia}`;

}


function generarLogout() {
    let botonCerarSesion = document.createElement("button");
    botonCerarSesion.setAttribute('id', 'botonRGST-LGN');
    // Establecer el texto del botón
    botonCerarSesion.innerText = "CERRAR SESION";
    botonCerarSesion.onclick = function () {
        // Llamar a la función definida en login.js
        if (typeof cerrarSesion === 'function') {
            cerrarSesion();
        } else {
            console.error("La función de login no está definida. cerarSesion");
        }
    };
    document.body.appendChild(botonCerarSesion);
}
// Llamar a la función para generar el formulario
//window.onload = generarMapa();




function generarEspacioCartas() {
    // Crear el elemento div que tendra el mapa
    var espacioCartas = document.createElement('div');

    var botonBorrar = document.createElement("button");
    botonBorrar.setAttribute("id", "botonBorrar")
    botonBorrar.onclick = function () {
        var cartas = document.querySelectorAll(".cartas");
        cartas.forEach(function (carta) {
            carta.remove();
        });
        localStorage.removeItem('cartasGuardadas');
    };
    botonBorrar.textContent = "🗑";
    // Establecer los atributos del div
    espacioCartas.id = 'espacioCartas';

    espacioCartas.appendChild(botonBorrar);
    // Agregar el div al cuerpo de la página
    document.body.appendChild(espacioCartas);
    actualizarcartas();
    //eventos 
    espacioCartas.addEventListener('dragover', function (evento) {
        evento.preventDefault(); // Permitir soltar la carta
    });

    espacioCartas.addEventListener('drop', function (evento) {
        var cartaArrastrada = document.querySelector('.cartas[draggable="true"]');
        evento.currentTarget.appendChild(cartaArrastrada);
        evento.preventDefault(); // Evitar comportamiento predeterminado del navegador
    });
}
//Genera cartas que la vez anterior
function regenerarCartas() {
    if (localStorage.getItem('cartasGuardadas') !== null) {
        // El array de municipios existe, entonces lo recuperamos
        var municipiosRecuperados = JSON.parse(sessionStorage.getItem('municipios'));
        var cartasGuardadas = JSON.parse(localStorage.getItem('cartasGuardadas'));

        municipiosRecuperados.forEach(municipio => {
            if (cartasGuardadas.includes(municipio.NOMBRE)) {
                // Crear una nueva carta
                let nuevaCarta = document.createElement('div');
                nuevaCarta.setAttribute("id", municipio.NOMBRE)
                nuevaCarta.classList.add('cartas'); // Agregar la clase cartas

                // Contenido de la carta
                let titulo = document.createElement('h2');
                titulo.textContent = municipio.NOMBRE;

                let contenido = document.createElement('div');
                let parrafo = document.createElement('p');
                parrafo.textContent = 'Humedad Relativa: ' + municipio.humedad_relativa;
                contenido.appendChild(parrafo);

                parrafo = document.createElement('p');
                parrafo.textContent = 'Orto: ' + municipio.orto;
                contenido.appendChild(parrafo);

                parrafo = document.createElement('p');
                parrafo.textContent = 'Ocaso: ' + municipio.ocaso;
                contenido.appendChild(parrafo);

                parrafo = document.createElement('p');
                parrafo.textContent = 'Precipitación: ' + municipio.precipitacion;
                contenido.appendChild(parrafo);

                parrafo = document.createElement('p');
                parrafo.textContent = 'Temperatura Mínima: ' + municipio.temperatura_min;
                contenido.appendChild(parrafo);

                parrafo = document.createElement('p');
                parrafo.textContent = 'Temperatura Máxima: ' + municipio.temperatura_max;
                contenido.appendChild(parrafo);

                descripcion = document.createElement('p');


                // Agregar elementos a la carta
                nuevaCarta.appendChild(titulo);
                nuevaCarta.appendChild(contenido);
                nuevaCarta.appendChild(descripcion);
                // Asignar eventos de arrastre y soltado a la carta
                nuevaCarta.setAttribute('draggable', true);
                nuevaCarta.addEventListener('dragstart', comenzarArrastre);
                nuevaCarta.addEventListener('dragend', soltarCarta);


                const options = {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXJAcGxhaWF1bmRpLm5ldCJ9.YPY77vtxLZDsm35Ho_-M9HcW0KmLhLJMsaPmmDsV0d2PfFKyTI5vHhrS8Ib62azMxcRpo_88_V6RuMLalWP7RT-gbCBxfLuKqGaK91AvFvv62nATf1suvuBg0H7FA3pEuvMfY20bUYwPMrfaBrUkmDlIL0jl3ogSKEIQzhjnwRoluW534S27xcHtdhD_akQGYFFjt9gwzvdyhSkvxKKKQPGYBK8dVuNTdGX2hBRnuVr9evZ4zWlqg448EBPdMg4DYv0aTAg7A-acWB3PEOlwBPeyBzDzUua9SBk7g9lgjn1MMHOs0qN0mopR380RXMHiM0yO1VO9fNRSsqW2Ne-e_w',
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                };
                fechaAyer = new Date;
                fechaManana = new Date;
                fechaAyer.setDate(fechaAyer.getDate() - 1);
                fechaManana.setDate(fechaManana.getDate() + 1);
                let zone = "";
                switch (municipio.NOMBRE_PROVINCIA) {
                    case "Gipuzkoa":
                        zone = "donostialdea";
                        break;
                    case "Bizkaia":
                        zone = "cantabrian_mountains"
                        break;
                    case "Araba/Álava":
                        zone = "ebro_valley";
                        break;

                    default:
                        break;
                }

                fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/` + zone + `/forecast/at/` + formatoFecha1(fechaAyer) + `/for/` + formatoFecha2(fechaManana), options)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("La solicitud meteorológica no se pudo completar correctamente.");
                        }

                        return response.arrayBuffer();
                        //return response.json();
                    })
                    .then(data => {
                        const decoder = new TextDecoder('iso-8859-1');
                        //console.log("cantabrian_valleys/forecast/at/" + marker._icon.id);
                        const text = decoder.decode(data);
                        dataMeteo = JSON.parse(text);

                        console.log(municipio);
                        descripcion.textContent = dataMeteo.forecastTextByLang.SPANISH;
                        descripcion.setAttribute('id', 'descripcion');
                        nuevaCarta.appendChild(descripcion);
                        document.getElementById("espacioCartas").appendChild(nuevaCarta); //Abiertos

                    })
                console.log('Click en ' + municipio.NOMBRE);
            }
        });
        // Aquí puedes hacer lo que necesites con el array recuperado

    } else {
        // El array de municipios no existe en el sessionStorage
        console.log("El array de municipios no existe en el sessionStorage.");
    }
}
// Función que se ejecuta cuando comienza el arrastre
function comenzarArrastre(evento) {
    evento.dataTransfer.setData('text/plain', ''); // Necesario para Firefox
    evento.currentTarget.style.opacity = '0.5'; // Cambia la opacidad mientras se arrastra
}

// Función que se ejecuta cuando se suelta la carta
function soltarCarta(evento) {
    evento.currentTarget.style.opacity = '1';
    var espacioCartas = document.getElementById('espacioCartas');
    espacioCartas.appendChild(evento.currentTarget);
    evento.preventDefault(); // Evitar comportamiento predeterminado del navegador
}

function actualizarcartas() {
    //si existe carta actualiza us datos
    var urlActual = (new URL(window.location.origin)).hostname;
    let token = sessionStorage.getItem('accessToken');
    setInterval(() => {

        fetch("http://" + urlActual + ":8082/api/auth/municipios", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json; charset=UTF-8"

            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("La solicitud no se pudo completar correctamente.");
                }
                return response.json();
            })
            .then(dataMunicipios => {
                // Convertir el array de provincias a cadena JSON
                var municipiosJSON = JSON.stringify(dataMunicipios);

                // Guardar la cadena JSON en el almacenamiento de sesión
                sessionStorage.setItem('municipios', municipiosJSON);
                //por cada dato busca carta
                dataMunicipios.forEach(municipio => {
                    try {


                        if (document.getElementById(municipio.NOMBRE) !== null) {
                            guardarCartaEnLocalStorage(municipio.NOMBRE);

                            let nuevaCarta = document.getElementById(municipio.NOMBRE);

                            console.log("municipio.NOMBRE  " + municipio.NOMBRE);
                            console.log("nuevaCarta  " + nuevaCarta.innerHTML);

                            var partes = nuevaCarta.innerHTML.split('<p id="descripcion">');

                            // Verificar si la cadena se dividió correctamente y tiene al menos dos partes
                            if (partes.length >= 2) {
                                // Obtener la segunda parte y dividirla usando ']' como delimitador
                                var descripcionText = partes[1].split('</p>')[0];
                            }
                            //borrar contenido
                            nuevaCarta.innerHTML = "";


                            // Contenido de la carta
                            let titulo = document.createElement('h2');
                            titulo.textContent = municipio.NOMBRE;

                            let contenido = document.createElement('div');
                            let parrafo = document.createElement('p');
                            parrafo.textContent = 'Humedad Relativa: ' + municipio.humedad_relativa;
                            contenido.appendChild(parrafo);

                            parrafo = document.createElement('p');
                            parrafo.textContent = 'Orto: ' + municipio.orto;
                            contenido.appendChild(parrafo);

                            parrafo = document.createElement('p');
                            parrafo.textContent = 'Ocaso: ' + municipio.ocaso;
                            contenido.appendChild(parrafo);

                            parrafo = document.createElement('p');
                            parrafo.textContent = 'Precipitación: ' + municipio.precipitacion;
                            contenido.appendChild(parrafo);

                            parrafo = document.createElement('p');
                            parrafo.textContent = 'Temperatura Mínima: ' + municipio.temperatura_min;
                            contenido.appendChild(parrafo);

                            parrafo = document.createElement('p');
                            parrafo.textContent = 'Temperatura Máxima: ' + municipio.temperatura_max;
                            contenido.appendChild(parrafo);

                            descripcion = document.createElement('p');
                            descripcion.textContent = descripcionText;
                            descripcion.setAttribute('id', 'descripcion');

                            // Agregar elementos a la carta
                            nuevaCarta.appendChild(titulo);
                            nuevaCarta.appendChild(contenido);
                            nuevaCarta.appendChild(descripcion);

                        }

                    } catch (error) {
                        console.log(error);
                    }
                });

            });
    }, 2000);
}
// Función para guardar el ID de la carta en localStorage
function guardarCartaEnLocalStorage(cartaID) {
    // Verificar si el ID de la carta ya ha sido guardado antes
    if (!localStorage.getItem('cartasGuardadas') || !localStorage.getItem('cartasGuardadas').includes(cartaID)) {
        // Verificar si ya existe un array de cartas en localStorage
        let cartasGuardadas = localStorage.getItem('cartasGuardadas');
        if (!cartasGuardadas) {
            // Si no existe, crear un nuevo array y agregar el ID de la carta
            cartasGuardadas = [cartaID];
        } else {
            // Si ya existe, convertir el JSON en un array
            cartasGuardadas = JSON.parse(cartasGuardadas);
            // Verificar si el ID de la carta ya está en el array
            if (!cartasGuardadas.includes(cartaID)) {
                // Si no está, agregar el ID de la carta al array
                cartasGuardadas.push(cartaID);
            }
        }
        // Guardar el array actualizado en localStorage
        localStorage.setItem('cartasGuardadas', JSON.stringify(cartasGuardadas));
    }
}

function generarAyuda() {
    // Crear un nuevo elemento de texto
    var textoAyuda = document.createElement('div');

    // Establecer el contenido del texto
    textoAyuda.textContent = 'Doble ckick para ver prevision';

    // Establecer estilos para el texto de ayuda
    textoAyuda.style.position = 'fixed';
    textoAyuda.style.top = '50vh';
    textoAyuda.style.right = '75vw';
    textoAyuda.id = "ayuda"
    textoAyuda.style.padding = '5px'; // Añade un poco de espacio alrededor del texto
    textoAyuda.style.zIndex = '1000'; // Establecer el z-index a 1000

    // Agregar el texto al cuerpo del documento
    document.body.appendChild(textoAyuda);

    // Añadir un event listener para el evento mouseout
    textoAyuda.addEventListener('mouseout', function () {

        var textoAyuda2 = document.createElement('div');

        // Establecer el contenido del texto
        textoAyuda2.textContent = "Recuerda que puedes arrastrar aqui las cartas abajo";

        // Establecer estilos para el texto de ayuda
        textoAyuda2.style.position = 'fixed';
        textoAyuda2.style.top = '73vh';
        textoAyuda2.style.right = '55vw';
        textoAyuda2.id = "ayuda"
        textoAyuda2.style.padding = '5px'; // Añade un poco de espacio alrededor del texto
        textoAyuda2.style.zIndex = '1000'; // Establecer el z-index a 1000

        // Agregar el texto al cuerpo del documento
        document.body.appendChild(textoAyuda2);
        textoAyuda2.addEventListener('mouseout', function () {
            textoAyuda2.style.display = 'none';
        });
        // Ocultar el texto de ayuda cuando el cursor del mouse sale del elemento
        textoAyuda.style.display = 'none';
    });
}