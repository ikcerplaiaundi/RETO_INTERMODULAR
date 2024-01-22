// Función para generar el formulario de login dinámicamente
function generarLogin(){
    //si existia algo de antes lo borro
    document.body.innerHTML="";
    
    // Crear el elemento div
    let formularioDiv = document.createElement('div');

    // Establecer los atributos del div
    formularioDiv.id = 'formulario';

    // Agregar el div al cuerpo de la página
    document.body.appendChild(formularioDiv);

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
    document.body.appendChild(botonRegistrarse);

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
        login(email, contrasena);

        // Aquí puedes agregar lógica para procesar el formulario, por ejemplo, enviar datos a un servidor.
        //document.body.removeChild(formularioDiv);

        // Puedes acceder a los valores del formulario con: inputNombre.value, inputEmail.value, inputContraseña.value
        console.log('Formulario enviado');
    });
}

async function login(email, contrasena) {
    try {
        let respuesta = await fetch("http://localhost:8082/api/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: contrasena,
                remember_me: 0
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        let data = await respuesta.json();
        console.log(data);

        if (data["message"] === 'Unauthorized') {
            
            console.error('Error al registrarse:');
        } else {
            // Registro exitoso
            document.body.innerHTML="";
            generarMapa(data)
            
        }
    } catch (error) {
        console.error(error);
    }
}
async function cerarSesion2(dataJson){
    console.log(dataJson[1][2]);
    try {
        let respuesta = await fetch("http://localhost:8082/api/logout", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + dataJson[access_token][plainTextToken],
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

async function cerrarSesion(dataJson) {
    try {
        let accessToken = dataJson.access_token.accessToken.plainTextToken;

        let respuesta = await fetch("http://localhost:8082/api/logout", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken,
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