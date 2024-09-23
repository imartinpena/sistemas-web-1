const express = require('express');
const router = express.Router();
const users = require('../users'); // Importar el módulo users

// Ruta para mostrar la lista de usuarios
router.get('/', function(req, res, next) {
    if (!req.session.user) {
        req.session.error = 'Debes iniciar sesión para ver la lista de usuarios.';
        return res.redirect('/login');
    }

    const allUsers = users.getAllUsers(); // Obtener todos los usuarios
    const currentUser = req.session.user; // Obtener el usuario actual de la sesión

    res.render('userlist', { title: 'User List', currentUser, allUsers, user: currentUser });
});

// Ruta para eliminar usuarios usando POST
router.post('/deleteUser', function(req, res, next) {
    const currentUser = req.session.user;
    const usernameToDelete = req.body.username;

    if (currentUser && currentUser.username === 'admin' && usernameToDelete) {
        const success = users.deleteUser(usernameToDelete); // Llamar a deleteUser desde users.js
        if (success) {
            res.redirect('/userlist'); // Redirigir a la lista de usuarios si se elimina con éxito
        } else {
            res.status(404).send('Usuario no encontrado'); // Manejo del error si el usuario no se encuentra
        }
    } else {
        res.status(403).send('Acceso prohibido'); // Manejo del error si el usuario no es admin o la solicitud es inválida
    }
});

module.exports = router;