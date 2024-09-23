// routes/chatPrivate.js
const express = require('express');
const router = express.Router();
const users = require('../users'); // Importar el archivo de usuarios

// Ruta para mostrar la lista de usuarios
router.get('/', function(req, res, next) {
    const allUsers = users.getAllUsers(); // Obtener todos los usuarios registrados
    const currentUser = req.session.user;

    // Filtrar usuarios para que no aparezca el mismo usuario en la lista
    const filteredUsers = allUsers.filter(user => user.username !== currentUser.username);

    res.render('chatPrivate', { 
        title: 'Chat Privado', 
        users: filteredUsers,
        user: currentUser // Usuario actual
    });
});

// Ruta para el chat privado entre dos usuarios
router.get('/:username', function(req, res, next) {
    const { username } = req.params; // Usuario con quien se va a chatear
    const currentUser = req.session.user;

    if (users[username]) {
        res.render('chatPrivateRoom', {
            title: `Chat con ${username}`,
            user: currentUser,
            chatUser: username // Usuario con quien se está chateando
        });
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

module.exports = router;