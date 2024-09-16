const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Ruta para mostrar la interfaz del generador de contraseñas
router.get('/', (req, res) => {
    res.render('passwordGenerator', { title: 'Password Generator', user: req.session.user}); // Renderiza la vista passwordGenerator.ejs
});

// Ruta para cargar el diccionario desde un archivo de texto
router.get('/diccionario', (req, res) => {
    const diccionarioPath = path.join(__dirname, '../diccionario.txt'); // Ruta ajustada a la raíz del proyecto

    fs.readFile(diccionarioPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el diccionario:', err);
            res.status(500).send('Error al leer el diccionario');
            return;
        }
        res.send(data); // Enviar el contenido del diccionario al cliente
    });
});

module.exports = router;