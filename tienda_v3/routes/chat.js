const express = require('express');
const router = express.Router();

// Array global para almacenar mensajes en memoria
let mensajes = []; // Este array debe ser accesible desde `app.js`

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('chat', {
        title: 'Chat Grupal',
        user: req.session.user,
        mensajes: mensajes // Pasar los mensajes actuales al renderizar la página
    });
});

module.exports = router;