document.querySelectorAll('.estado').forEach(function(estadoElemento) {
    const estadoTexto = estadoElemento.textContent.toLowerCase(); // Obtenemos el texto del estado
    estadoElemento.classList.add(estadoTexto); // Agregamos la clase correspondiente
});