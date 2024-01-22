// funcion de generar el mapa
function generarMapa(dataJson){
    
    let botonCerarSesion = document.createElement("button");
    botonCerarSesion.setAttribute('id', 'botonRGST-LGN');
    // Establecer el texto del botón
    botonCerarSesion.innerText = "CERAR SESION";
    botonCerarSesion.onclick = function () {
        // Llamar a la función definida en login.js
        if (typeof cerrarSesion === 'function') {
            cerrarSesion(dataJson);
        } else {
            console.error("La función de login no está definida. cerarSesion");
        }
    };
    document.body.appendChild(botonCerarSesion);

    // Crear el elemento div
    var mapDiv = document.createElement('div');

    // Establecer los atributos del div
    mapDiv.id = 'mapid';
    mapDiv.style.margin = '0';
    mapDiv.style.width = '100%';
    mapDiv.style.height = '600px';

    // Agregar el div al cuerpo de la página
    document.body.appendChild(mapDiv);


    setTimeout(() => {
        //mapa y peticiones
        var map = L.map('mapid').setView([43.34567, -1.79690], 8);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        // consigo provincias
        fetch("https://www.el-tiempo.net/api/json/v2/provincias")
            .then(response => {
                if (!response.ok) {
                    throw new Error("La solicitud provincias no se pudo completar correctamente.");
                }
                return response.json();
            })
            .then(dataProvincias => {
                //recorro provincias para buscar las que quiero y mostrar sus municipios
                dataProvincias.provincias.forEach(provincia => {
                    // provincias
                    if (provincia.COMUNIDAD_CIUDAD_AUTONOMA == "País Vasco/Euskadi") {
                        fetch("https://www.el-tiempo.net/api/json/v2/provincias/" + provincia.CODPROV + "/municipios")
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error("La solicitud no se pudo completar correctamente.");
                                }
                                return response.json();
                            })
                            .then(dataMunicipios => {
                                dataMunicipios.municipios.forEach(municipio => {
                                    let marker = L.marker([municipio.LATITUD_ETRS89_REGCAN95, municipio.LONGITUD_ETRS89_REGCAN95]).addTo(map);
                                    marker._icon.classList.add("huechange");
                                    marker._icon.id = "provincias/" + municipio.CODPROV + "/municipios/" + municipio.CODIGOINE.substring(0, 5);

                                    marker.bindTooltip(municipio.NOMBRE, {
                                        permanent: false,    // El tooltip no será permanente
                                        //direction: 'top',    // Se mostrará encima del marcador
                                        offset: L.point(-10, 30) // Desplazamiento del tooltip respecto al marcador

                                    })
                                    marker.on('click', function () {

                                        fetch("https://www.el-tiempo.net/api/json/v2/" + marker._icon.id)
                                            .then(response => {
                                                if (!response.ok) {
                                                    throw new Error("La solicitud meteorológica no se pudo completar correctamente.");
                                                }
                                                return response.json();
                                            })
                                            .then(dataMeteo => {

                                                marker.bindPopup(dataMeteo.stateSky.description); //Abiertos

                                            })
                                        console.log('Click en ' + municipio.NOMBRE);
                                    })

                                });
                            })

                    }

                })
            });
    }, 100);
};

// Llamar a la función para generar el formulario
//window.onload = generarMapa();