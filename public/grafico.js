
function generarGrafico() {
    // Crear contenedor
    var contenedor = document.createElement('div');
    contenedor.setAttribute('id', 'grafico-container');


    // Crear campo de fecha 1
    var fecha1Label = document.createElement('label');
    fecha1Label.textContent = 'Fecha 1:';
    var fecha1Input = document.createElement('input');
    fecha1Input.setAttribute('type', 'date');
    fecha1Input.setAttribute('name', 'fecha1');

    // Crear campo de fecha 2
    var fecha2Label = document.createElement('label');
    fecha2Label.textContent = 'Fecha 2:';
    var fecha2Input = document.createElement('input');
    fecha2Input.setAttribute('type', 'date');
    fecha2Input.setAttribute('name', 'fecha2');

    // Crear selector desplegable
    var selectorLabel = document.createElement('label');
    selectorLabel.textContent = 'MUNICIPIO:';
    var selector = document.createElement('select');
    selector.setAttribute('name', 'selector');

    // Opciones del selector
    var option1 = document.createElement('option');
    option1.textContent = 'Araba';
    var option2 = document.createElement('option');
    option2.textContent = 'Irun';


    // Agregar opciones al selector
    selector.appendChild(option1);
    selector.appendChild(option2);


    // Crear botón
    var boton = document.createElement('button');
    boton.textContent = 'Mostrar Histórico';
    boton.addEventListener('click', function () {
        esquema();

    });

    // Agregar elementos al formulario
    contenedor.appendChild(fecha1Label);
    contenedor.appendChild(fecha1Input);
    contenedor.appendChild(document.createElement('br'));
    contenedor.appendChild(fecha2Label);
    contenedor.appendChild(fecha2Input);
    contenedor.appendChild(document.createElement('br'));
    contenedor.appendChild(selectorLabel);
    contenedor.appendChild(selector);
    contenedor.appendChild(document.createElement('br'));
    contenedor.appendChild(boton);



    // Agregar contenedor al cuerpo del documento
    document.body.appendChild(contenedor);
}

// Función 'historico' que toma los datos del formulario
function historico() {
    //var urlActual = (new URL(window.location.origin)).hostname;
    var urlActual = "localhost"
    //Datos provisionales a enviar en la solicitud
    const nombreMunicipio = "Artziniega";
    const fechaInicio = "2024-01-01T00:00:00.000Z";
    const fechaFin = "2024-01-02T00:00:00.000Z";

    // Construir la URL con parámetros de consulta
    let token = sessionStorage.getItem('accessToken');
    const options = {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Accept": "application/json; charset=UTF-8"

        }
    };

    let fecha_inicio = '2023-08-02';
    let fecha_fin = '2023-08-03';
    
    let url = `http://localhost:8082/api/auth/measurements/filterBetweenData?nombre_municipio=Artziniega&fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`
    //fetch(`http://${urlActual}:8082/api/auth/measurements/filterBetweenData?nombre_municipio=${nombreMunicipio}&fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`, options)
    fetch(url, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

function esquema() {
    import('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js')
        .then((module) => {
            //tratar de borramos el anterior
            try {
               document.getElementById('grafico-container').removeChild(document.getElementById("myChart")); 
            } catch (error) {
                //nada
            }
            
            const xValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
            
            // Crear el nuevo elemento canvas
            var canvas = document.createElement('canvas');

            // Asignar el id al canvas
            canvas.id = 'myChart';

            // Aplicar estilos al canvas
            canvas.style.width = '20vw';
            canvas.style.height = '20vw';


            // Agregar el canvas al cuerpo del cntenedor 
            document.getElementById('grafico-container').appendChild(canvas);

            new Chart("myChart", {
                type: "line",
                data: {
                    labels: xValues,
                    datasets: [{
                        label: 'TEMPERATURA MAX',
                        data: [12, 13, 16, 15, 14, 17, 18, 20, 21, 19],
                        borderColor: "red",
                        fill: false
                    }, {
                        label: 'TEMPERATURA MIN',
                        data: [8, 9, 12, 11, 10, 13, 14, 16, 17, 15],
                        borderColor: "green",
                        fill: false
                    }, {
                        label: 'HUMEDAD',
                        data: [45, 47, 42, 40, 50, 48, 55, 52, 46, 43],
                        borderColor: "blue",
                        fill: false
                    }]
                },
                options: {
                    legend: { display: true }
                }
            });
        })
        .catch((error) => {
            // Manejar cualquier error de importación
            console.error('Error al importar el módulo:', error);
        });
}