// Función para generar el formulario de registro dinámicamente

function generarRegister() {
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

    let labelNombre = document.createElement('label');
    labelNombre.textContent = 'Nombre:';
    let inputNombre = document.createElement('input');
    inputNombre.setAttribute('type', 'text');
    inputNombre.setAttribute('name', 'nombre');
    inputNombre.setAttribute('required', 'true');

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
    botonEnviar.textContent = 'Registrarse';



    // Agregar elementos al formulario
    formulario.appendChild(labelNombre);
    formulario.appendChild(inputNombre);
    formulario.appendChild(document.createElement('br'));

    formulario.appendChild(labelEmail);
    formulario.appendChild(inputEmail);
    formulario.appendChild(document.createElement('br'));

    formulario.appendChild(labelContrasena);
    formulario.appendChild(inputContrasena);
    formulario.appendChild(document.createElement('br'));

    formulario.appendChild(botonEnviar);

    // Agregar formulario al contenedor
    formularioContainer.appendChild(formulario);


    let botonIniSesion = document.createElement("button");
    botonIniSesion.setAttribute('id', 'botonRGST-LGN');
    // Establecer el texto del botón
    botonIniSesion.innerText = "INICIAR SESIÓN";
    botonIniSesion.onclick = function () {
        // Llamar a la función definida en login.js
        if (typeof generarLogin === 'function') {
            document.body.innerHTML="";
            
            generarLogin();
        } else {
            console.error("La función de login no está definida.");
        }
    };

    document.body.appendChild(botonIniSesion);

    // Manejar el evento de envío del formulario
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        // Obtener los valores del formulario
        let nombre = inputNombre.value;
        let email = inputEmail.value;
        let contrasena = inputContrasena.value;
        registro(nombre, email, contrasena);

        // Aquí puedes agregar lógica para procesar el formulario, por ejemplo, enviar datos a un servidor.


        // Puedes acceder a los valores del formulario con: inputNombre.value, inputEmail.value, inputContraseña.value
        console.log('Formulario enviado');
    });
}

async function registro(nombre, email, contrasena) {
    try {
        let respuesta = await fetch("http://localhost:8082/api/signup", {
            method: "POST",
            body: JSON.stringify({
                name: nombre,
                email: email,
                password: contrasena,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        let data = await respuesta.json();
        console.log(data);

        if (data["message"] === 'Successfully created user!') {
            // Registro exitoso
            alert("registrado con exito");
            generarLogin();
        } else {
            // Ha fallado el registro
            console.error('Error al registrarse:', data["message"]);
        }
    } catch (error) {
        console.error(error);
    }
}




