// Inicializamos una variable para llevar el conteo de los productos que se van añadiendo.
let productIndex = 1;

// Añadimos un event listener que escucha cuando el usuario hace clic en el botón con id 'agregarProducto'.
document.getElementById('agregarProducto').addEventListener('click', function () {

    // Seleccionamos el contenedor donde se agregarán los nuevos campos de productos. 
    // Este contenedor tiene el id 'productos'.
    const productosDiv = document.getElementById('productos');

    // Creamos un nuevo elemento 'div' que contendrá los campos de entrada (input) para cada producto.
    const newProductDiv = document.createElement('div');

    // Añadimos una clase 'producto' a este nuevo 'div' para aplicarle estilos o identificarlo más fácilmente.
    newProductDiv.classList.add('producto');

    // Definimos el contenido HTML del nuevo 'div' con los campos de entrada para nombre, cantidad y precio.
    // Utilizamos `productIndex` para asegurarnos de que cada campo tenga un nombre único en el formulario.
    newProductDiv.innerHTML = `
        <label for="nombre">Nombre del producto:</label>
        <input type="text" name="productos[${productIndex}].nombre" required>
        <label for="cantidad">Cantidad:</label>
        <input type="number" name="productos[${productIndex}].cantidad" min="1" required>
        <label for="precio">Precio:</label>
        <input type="number" step="0.01" name="productos[${productIndex}].precio" required>
    `;

    // Añadimos el nuevo 'div' con los campos al contenedor 'productosDiv', que contiene todos los productos.
    productosDiv.appendChild(newProductDiv);

    // Incrementamos el índice del producto para que el siguiente conjunto de campos tenga nombres únicos.
    productIndex++;
});