// Función para generar el formulario de login dinámicamente
function generarLogin(mensage) {
    
    //si existia algo de antes lo borro
    document.body.innerHTML = "";

    if(mensage !== 'undefined'){
        parrafo = document.createElement('p');
        parrafo.setAttribute('id', 'mensageLOG');
        parrafo.textContent = mensage;
        document.body.appendChild(parrafo);
    }

    //creo el contenedor
    let contenedorDiv = document.createElement('div');
    contenedorDiv.id = 'contenedor';


    // Aplicar estilos al body
    contenedorDiv.style.margin = '0';
    contenedorDiv.style.padding = '0';
    contenedorDiv.style.background = 'url("/public/nube.png") no-repeat center center fixed';
    contenedorDiv.style.backgroundSize = 'cover';
    contenedorDiv.style.height = '100vh';
    contenedorDiv.style.display = 'flex';
    contenedorDiv.style.justifyContent = 'center';
    contenedorDiv.style.alignItems = 'center';

    document.body.appendChild(contenedorDiv);

    // Crear el elemento div
    let formularioDiv = document.createElement('div');

    // Establecer los atributos del div
    formularioDiv.id = 'formulario';

    // Agregar el div al cuerpo de la página
    contenedorDiv.appendChild(formularioDiv);

    let formularioContainer = document.getElementById('formulario');

    // Crear elementos del formulario
    let formulario = document.createElement('form');
    formulario.setAttribute('id', 'registro-form');

    let labelEmail = document.createElement('label');
    labelEmail.textContent = 'Correo electrónico:';
    let inputEmail = document.createElement('input');
    inputEmail.setAttribute('type', 'email');
    inputEmail.setAttribute('name', 'email');
    inputEmail.setAttribute('required', 'true');

    let labelContrasena = document.createElement('label');
    labelContrasena.textContent = 'Contraseña:';
    let inputContrasena = document.createElement('input');
    inputContrasena.setAttribute('type', 'password');
    inputContrasena.setAttribute('name', 'contrasena');
    inputContrasena.setAttribute('required', 'true');

    let botonEnviar = document.createElement('button');
    botonEnviar.setAttribute('type', 'submit');
    botonEnviar.setAttribute('id', 'botonEnviar');
    botonEnviar.textContent = 'Entrar';

    let botonRegistrarse = document.createElement("button");
    botonRegistrarse.setAttribute('id', 'botonRGST-LGN');
    // Establecer el texto del botón
    botonRegistrarse.innerText = "CREAR CUENTA";
    botonRegistrarse.onclick = function () {
        // Llamar a la función definida en login.js
        if (typeof generarRegister === 'function') {
            generarRegister();

        } else {
            console.error("La función de login no está definida. generarRegister");
        }
    };
    contenedorDiv.appendChild(botonRegistrarse);

    // Agregar elementos al formulario
    formulario.appendChild(labelEmail);
    formulario.appendChild(inputEmail);
    formulario.appendChild(document.createElement('br'));

    formulario.appendChild(labelContrasena);
    formulario.appendChild(inputContrasena);
    formulario.appendChild(document.createElement('br'));

    formulario.appendChild(botonEnviar);

    // Agregar formulario al contenedor
    formularioContainer.appendChild(formulario);

    // Manejar el evento de envío del formulario
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        // Obtener los valores del formulario

        let email = inputEmail.value;
        let contrasena = inputContrasena.value;

        // Llamar a la función definida en public\animacionDeCarga.js
        if (typeof cargaCanvasAnimation === 'function') {
            botonEnviar.textContent = '';
            
            botonEnviar.disabled = true;
            
            login(email, contrasena);
            cargaCanvasAnimation(document.body);
            botonEnviar.disabled = false;
            botonEnviar.textContent = 'Entrar';
        } else {
            console.error("La función cargaCanvasAnimation no está definida.");
        }



        // Aquí puedes agregar lógica para procesar el formulario, por ejemplo, enviar datos a un servidor.
        //document.body.removeChild(formularioDiv);

        // Puedes acceder a los valores del formulario con: inputNombre.value, inputEmail.value, inputContraseña.value
        console.log('Formulario enviado');
    });


}

async function login(email, contrasena) {
    // Obtén la URL actual del navegador
    var urlActual = (new URL(window.location.origin)).hostname;
    try {

        let respuesta = await fetch("http://" + urlActual + ":8082/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: contrasena,
                remember_me: 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        let data = await respuesta.json();


        if (data["message"] === 'Unauthorized') {
            generarLogin('Error al log: '+data["message"]);
            console.error('Error al registrarse:');
            document.getElementById("botonEnviar").disabled = false;
        } else {
            
            //funciona
            //guanda el token
            sessionStorage.setItem('accessToken', data.access_token.accessToken);
            //monta la spa
            document.body.innerHTML = "";
            if (typeof generarMapa === 'function') {
                generarMapa();
            } else {
                
                console.error("La función generarMapa no está definida.");
            }
            if (typeof generarEspacioCartas === 'function') {
                generarEspacioCartas();
            } else {
                console.error("La función generarEspacioCartas no está definida.");
            }

        }
    } catch (error) {
        console.error(error);
    }
}

async function cerrarSesion() {
    var urlActual = (new URL(window.location.origin)).hostname;
    let config = {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
    }
    fetch("http://" + urlActual + ":8082/api/auth/logout", config)
}


async function cerrarSesion2() {
    // Obtén la URL actual del navegador
    var urlActual = (new URL(window.location.origin)).hostname;
    try {
        let accessToken = sessionStorage.getItem('accessToken');

        let respuesta = await fetch("http://" + urlActual + ":8082/api/auth/logout", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("accesToken"),
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        let data = await respuesta.json();
        console.log(data);

        if (respuesta.status === 200) {


            // Logout exitoso
            console.log('Logout exitoso');
        } else {
            // Manejar errores
            console.error('Error al hacer logout:', data.message);
        }
    } catch (error) {
        console.error('Error en la solicitud de logout:', error);
    }
}