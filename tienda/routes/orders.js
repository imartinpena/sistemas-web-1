const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const users = require('../users'); // Asegúrate de que esta línea es necesaria en tu configuración actual y se usa adecuadamente.

// Ruta para mostrar la lista de pedidos
router.get('/', (req, res) => {
    const pedidosPath = path.join(__dirname, '../pedidos.json'); // Ruta al archivo JSON de pedidos

    fs.readFile(pedidosPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de pedidos:', err);
            res.status(500).send('Error al leer el archivo de pedidos');
            return;
        }

        const pedidos = JSON.parse(data).pedidos; // Parsear el archivo JSON para obtener los pedidos
        res.render('orders', { title: 'Lista de Pedidos', pedidos, user: req.session.user }); // Pasar la variable title y user
    });
});

// Ruta para mostrar el formulario de añadir un nuevo pedido
router.get('/addOrder', (req, res) => {
    // Aquí puedes agregar lógica para verificar si el usuario tiene permisos para añadir pedidos
    if (!req.session.user) {
        res.redirect('/login'); // Redirigir al login si el usuario no está autenticado
        return;
    }
    res.render('addOrder', { title: 'Añadir Nuevo Pedido', user: req.session.user });
});

// Ruta para manejar la solicitud POST de añadir un nuevo pedido
router.post('/addOrder', (req, res) => {
    const pedidosPath = path.join(__dirname, '../pedidos.json'); // Ruta al archivo JSON de pedidos

    // Leer el archivo pedidos.json
    fs.readFile(pedidosPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de pedidos:', err);
            res.status(500).send('Error al leer el archivo de pedidos');
            return;
        }

        let pedidos = JSON.parse(data).pedidos; // Parsear el contenido del archivo JSON

        // Encontrar el mayor ID actual y sumar uno para el nuevo pedido
        const nuevoId = pedidos.length > 0 ? Math.max(...pedidos.map(p => p.id)) + 1 : 1;

        // Crear un nuevo pedido basado en los datos del formulario
        const nuevoPedido = {
            id: nuevoId, // ID incremental
            cliente: req.body.cliente, // Datos del cliente desde el formulario
            fecha: req.body.fecha, // Fecha del pedido
            estado: req.body.estado, // Estado del pedido (Pendiente, Enviado, etc.)
            productos: [
                {
                    nombre: req.body.nombreProducto, // Nombre del producto
                    cantidad: parseInt(req.body.cantidadProducto), // Cantidad del producto
                    precio: parseFloat(req.body.precioProducto) // Precio del producto
                }
            ],
            total: parseFloat(req.body.precioProducto) * parseInt(req.body.cantidadProducto) // Calcular el total del pedido
        };

        pedidos.push(nuevoPedido); // Añadir el nuevo pedido al array de pedidos

        const jsonData = JSON.stringify({ pedidos }, null, 2); // Convertir el array actualizado a JSON

        // Escribir el array actualizado de pedidos en el archivo pedidos.json
        fs.writeFile(pedidosPath, jsonData, (err) => {
            if (err) {
                console.error('Error al escribir el archivo de pedidos:', err);
                res.status(500).send('Error al escribir el archivo de pedidos');
                return;
            }

            res.redirect('/orders'); // Redirigir a la lista de pedidos después de añadir uno nuevo
        });
    });
});

// Ruta para mostrar los detalles de un pedido específico por ID
router.get('/:id', (req, res) => {
    const pedidosPath = path.join(__dirname, '../pedidos.json');

    fs.readFile(pedidosPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de pedidos:', err);
            res.status(500).send('Error al leer el archivo de pedidos');
            return;
        }

        const pedidos = JSON.parse(data).pedidos;
        const pedido = pedidos.find(p => p.id === parseInt(req.params.id)); // Buscar pedido por ID

        if (!pedido) {
            res.status(404).send('Pedido no encontrado');
            return;
        }

        res.render('orderDetail', { title: 'Detalles del Pedido', pedido, user: req.session.user }); // Pasar la variable title y user
    });
});

module.exports = router;