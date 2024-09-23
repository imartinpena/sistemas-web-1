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


PEGATE ESTO EN UN ARCHIVO Y VE MIRANDOLO:

Para buscar por **nombre** en lugar de **ID** en el código que tienes, debes hacer algunos ajustes. El error que veo es que estás intentando acceder al juego utilizando el **nombre** como clave directamente en el objeto **`game.data`**, pero los objetos generalmente utilizan identificadores numéricos (como IDs) para las claves. En este caso, necesitas buscar en los valores de **`game.data`** hasta encontrar el juego cuyo nombre coincida con el parámetro de la URL.

Aquí te dejo los pasos para solucionar el problema:

### 1. Recorrer los juegos para encontrar el que coincida con el nombre

Debes recorrer todos los juegos en **`game.data`** y encontrar el que tenga el mismo nombre que el que estás buscando.

### 2. Ajustar la lógica para buscar por nombre

Revisemos cómo se puede hacer el ajuste en tu ruta GET para buscar por **nombre**:

#### Ajuste de la ruta GET para buscar por nombre:

```javascript
var express = require('express');
var router = express.Router();
const database = require('../database');

// Ruta GET para mostrar la lista de juegos
router.get('/', function(req, res, next) {
    res.render('games', {
        title: 'Lista de juegos de mesa',
        logged_user: req.session.user,
        games: Object.values(game.data) // Asegúrate de que game.data sea un objeto con juegos
    });
});

// Ruta GET para mostrar los detalles de un juego específico buscando por nombre
router.get('/:name', (req, res) => {
    const gameName = req.params.name; // Obtener el nombre de la URL
    const game = Object.values(game.data).find(g => g.nombre === gameName); // Buscar el juego por nombre

    if (!game) {
        return res.status(404).send('Juego no encontrado');
    }

    res.render('gamesDetail', {
        title: 'Detalles del Juego',
        game: game,
        user: req.session.user
    });
});

module.exports = router;
```

### Explicación:

1. **Buscar por nombre en lugar de ID**:
   - En lugar de usar **`game.data[req.body.name]`**, ahora estamos recorriendo todos los juegos utilizando **`Object.values(game.data)`** y buscando uno que tenga un **`nombre`** que coincida con el nombre en el parámetro de la URL.
   - **`find(g => g.nombre === gameName)`**: Esta función busca dentro del array de juegos un juego cuyo nombre sea igual al que se recibe en la URL.

2. **Parámetro `req.params.name`**:
   - Estamos utilizando **`req.params.name`** para obtener el nombre directamente de la URL. Esto es más apropiado que usar **`req.body.name`**, que es para datos enviados desde un formulario POST.

3. **Verificar si el juego existe**:
   - Si no se encuentra ningún juego con ese nombre, enviamos un mensaje de error 404 diciendo "Juego no encontrado".

4. **Renderizar los detalles del juego**:
   - Si se encuentra el juego, lo pasamos al renderizador **`gamesDetail`** junto con la información del usuario de la sesión.

### Resumen:

- **Recorre los valores del objeto** usando **`Object.values(game.data)`** para obtener un array de los juegos.
- Usa **`find`** para buscar el juego por el nombre en lugar de por el ID.
- Usa **`req.params.name`** para obtener el nombre del juego desde la URL.

Con estos cambios, deberías poder buscar un juego por su nombre en lugar de por su ID. Si tienes más dudas o algo no está funcionando como esperas, no dudes en decírmelo. ¡Estoy aquí para ayudarte!
