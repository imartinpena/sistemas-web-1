// routes/ordersObject.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Objeto para almacenar los pedidos
let pedidos = {};

// Función para cargar los pedidos desde pedidos.json
function cargarPedidos() {
    const filePath = path.join(__dirname, '../pedidos.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error al leer pedidos.json:", err);
            return;
        }
        const pedidosJson = JSON.parse(data).pedidos;
        pedidosJson.forEach(pedido => {
            pedidos[pedido.id] = pedido;
        });
        console.log("Pedidos cargados exitosamente.");
    });
}

// Llamar a la función para cargar pedidos al arrancar el servidor
cargarPedidos();

// Ruta GET para mostrar la lista de pedidos
router.get('/', (req, res) => {
    res.render('ordersObject', { 
        title: 'Lista de Pedidos',
        pedidos: Object.values(pedidos), // Convertimos el objeto en un array de pedidos
        user: req.session.user
    });
});

// Ruta GET para mostrar los detalles de un pedido específico
router.get('/:id', (req, res) => {
    const pedido = pedidos[req.params.id];

    if (!pedido) {
        return res.status(404).send('Pedido no encontrado');
    }
    // El nombre ordersObjectDetail tiene que ser el nombre del archivo ordersObjectDetail.ejs
    res.render('ordersObjectDetail', { 
        title: 'Detalles del Pedido',
        pedido: pedido,
        user: req.session.user
    });
});

// Ruta POST para agregar un nuevo pedido
router.post('/agregar', (req, res) => {
    const { cliente, fecha, estado, productos } = req.body;

    // Verificación de los datos recibidos
    console.log("Datos del cuerpo:", req.body);
    console.log("Productos recibidos: ", productos);

    // Verificar si el campo productos está definido y si contiene suficientes datos
    if (!productos || productos.length % 3 !== 0) {
        req.session.error = 'Debe agregar productos válidos con cantidades y precios mayores que 0.';
        return res.redirect('/ordersObject');
    }

    const id = Object.keys(pedidos).length + 1;

    // Procesar el array plano de productos y convertirlo en un array de objetos
    const productosArray = [];
    for (let i = 0; i < productos.length; i += 3) {
        const nombre = productos[i];
        const cantidad = parseInt(productos[i + 1], 10) || 0;
        const precio = parseFloat(productos[i + 2]) || 0.0;

        // Solo agregamos productos que tengan cantidad y precio válidos
        if (cantidad > 0 && precio > 0) {
            productosArray.push({
                nombre,
                cantidad,
                precio
            });
        }
    }

    // Si no hay productos válidos, mostramos un error
    if (productosArray.length === 0) {
        req.session.error = 'Debe agregar productos válidos con cantidades y precios mayores que 0.';
        return res.redirect('/ordersObject');
    }

    // Agregamos el nuevo pedido al objeto "pedidos"
    pedidos[id] = {
        id: id,
        cliente: cliente,
        fecha: fecha,
        estado: estado,
        productos: productosArray,
        total: calcularTotal(productosArray)
    };

    res.redirect('/ordersObject');
});

// Ruta PUT para actualizar el pedido
router.put('/:id', (req, res) => {
    const pedidoId = req.params.id;
    const { estado } = req.body;

    if (pedidos[pedidoId]) {
        pedidos[pedidoId].estado = estado;

        // Guardar cambios en el archivo pedidos.json
        const filePath = path.join(__dirname, '../pedidos.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error("Error al leer pedidos.json:", err);
                return res.status(500).send('Error al actualizar el pedido.');
            }
            
            let pedidosJson = JSON.parse(data);
            let pedidoIndex = pedidosJson.pedidos.findIndex(p => p.id == pedidoId);
            if (pedidoIndex !== -1) {
                pedidosJson.pedidos[pedidoIndex].estado = estado; 
                fs.writeFile(filePath, JSON.stringify(pedidosJson, null, 2), (err) => {
                    if (err) {
                        console.error("Error al escribir pedidos.json:", err);
                        return res.status(500).send('Error al guardar los cambios.');
                    }
                    res.redirect(`/ordersObject/${pedidoId}`);
                });
            } else {
                res.status(404).send('Pedido no encontrado.');
            }
        });
    } else {
        res.status(404).send('Pedido no encontrado.');
    }
});

// En la ruta DELETE, llama a guardarPedidos() después de eliminar un pedido
router.delete('/:id', (req, res) => {
    const pedidoId = req.params.id;

    if (pedidos[pedidoId]) {
        delete pedidos[pedidoId]; // Eliminar el pedido
        res.redirect('/ordersObject');
    } else {
        res.status(404).send('Pedido no encontrado');
    }
});


// Función para calcular el total del pedido basado en los productos
function calcularTotal(productos) {
    return productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
}

module.exports = router;