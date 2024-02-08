

function cargaCanvasAnimation(padre) {
    document.body.innerHTML = "";
    let lado =80;
    

    var elem = document.createElement("canvas");
    elem.setAttribute("id", "canvas");
    elem.setAttribute("width", lado - 1);
    elem.setAttribute("height", lado - 1);
    elem.setAttribute("min-width", "10px");
    elem.setAttribute("min-height", "10px");
    padre.appendChild(elem);
    var canvas = elem.getContext("2d");


    var i = 0;
    var j = 0;

    var v = 0.1 //velocidad de giro
    var angulo = 0; //angulo onicial
    var lastFrameTime = performance.now(); // Guardar el tiempo del último fotograma

    // Función para dibujar la esfera en el canvas
    function dibujar(currentTime) {
        try {
        let width = padre.offsetWidth;
        let height = padre.offsetHeight;
        let lado=80
        

        document.getElementById("canvas").setAttribute("width", width);
        document.getElementById("canvas").setAttribute("Height", width);
        let x = width / 2; // Coordenada X inicial del centro de la esfera
        let y = height / 2; // Coordenada Y inicial del centro de la esfera
        let radio = lado / 6; // Radio de la esfera
        let r = lado / 3; //radio de la trayectoria


        var deltaTime = currentTime - lastFrameTime; // Calcular la diferencia de tiempo entre fotogramas
        lastFrameTime = currentTime; // Actualizar el tiempo del último fotograma
        canvas.clearRect(0, 0, lado, lado); // Borrar el canvas antes de dibujar
        angulo++;

        // Dibujar la esfera 1
        i = x + (Math.cos(angulo * v) * r);
        j = y + (Math.sin(angulo * v) * r);

        canvas.beginPath();
        canvas.arc(i, j, radio, 0, Math.PI * 2); // Dibujar un círculo
        canvas.fillStyle = "#888"; // Establecer el color de relleno
        canvas.fill(); // Rellenar el círculo
        canvas.closePath();




        // Dibujar la esfera 2
        i = x + (Math.cos((angulo + 50) * v) * r);
        j = y + (Math.sin((angulo + 50) * v) * r);
        canvas.beginPath();
        canvas.arc(i, j, radio, 0, Math.PI * 2); // Dibujar un círculo
        canvas.fillStyle = "#b8b8b8"; // Establecer el color de relleno
        canvas.fill(); // Rellenar el círculo
        canvas.closePath();



        // Dibujar la esfera 3
        i = x + (Math.cos((angulo + 100) * v) * r);
        j = y + (Math.sin((angulo + 100) * v) * r);

        canvas.beginPath();
        canvas.arc(i, j, radio, 0, Math.PI * 2); // Dibujar un círculo
        canvas.fillStyle = "#e6e6e6"; // Establecer el color de relleno
        canvas.fill(); // Rellenar el círculo
        canvas.closePath();

        requestAnimationFrame(dibujar); // Llamar a la función dibujar en cada fotograma
    } catch (error) {
            
    }
    }

    // Iniciar el dibujo cuando se cargue el contenido
    requestAnimationFrame(function (timestamp) {
        
            dibujar(timestamp); // Llamar a la función dibujar una vez que el contenido esté cargado
       
        
    });
}