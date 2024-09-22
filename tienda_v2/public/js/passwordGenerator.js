let palabras = [];

// Función para cargar el diccionario desde el servidor
function cargarDiccionario() {
    fetch('/passwordGenerator/diccionario') // Llama a la ruta que sirve el diccionario
        .then(response => response.text())
        .then(data => {
            palabras = data.split('\n'); // Utilizar salto de línea como delimitador
        })
        .catch(error => {
            console.error('Error al cargar el diccionario:', error);
        });
}

// Llamar a la función para cargar el diccionario cuando la página se carga
cargarDiccionario();

document.getElementById("boton").addEventListener('click', () => {
    let numPalabras = Number(document.getElementById("numPalabras").value);
    let password = "";

    for (let i = 0; i < numPalabras; i++) {
        let numAleatorio = Math.floor(Math.random() * palabras.length);
        let palabra = palabras[numAleatorio].trim(); // Eliminar espacios en blanco adicionales
        password += palabra[0].toUpperCase() + palabra.slice(1);
    }

    document.getElementById("texto").innerHTML = "La contraseña generada es: " + password;
});