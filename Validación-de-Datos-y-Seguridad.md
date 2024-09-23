quiero buscar por nombre no por id como lo hago 

var express = require('express');
var router = express.Router();
const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('games', { title: 'Lista de juegos de mesa', logged_user: req.session.user, games: Object.values(game.data)});
});

// Ruta GET para mostrar los detalles de un pedido específico
router.get('/:name', (req, res) => {
  const game = game.data[req.body.name];

  if (!game) {
      return res.status(404).send('Pedido no encontrado');
  }

  res.render('gamesDetail', { 
      title: 'Detalles del Juego',
      game: game.data,
      user: req.session.user
  });
});

module.exports = router;
