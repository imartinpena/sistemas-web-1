let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const session = require('express-session');
let users = require('./users'); // Importar el archivo de usuarios para gestionar usuarios
let methodOverride = require('method-override'); // Importa method-override para permitir métodos PUT y DELETE
let indexRouter = require('./routes/index');
let loginRouter = require('./routes/login');
let restrictedRouter = require('./routes/restricted');
let registerRouter = require('./routes/register');
let chatRouter = require('./routes/chat');
let userlistRouter = require('./routes/userlist');
let passwordGeneratorRouter = require('./routes/passwordGenerator');
let ordersRouter = require('./routes/orders');
let ordersObjectRouter = require('./routes/ordersObject');
let chatPrivateRouter = require('./routes/chatPrivate');
let app = express();

// Configuración del motor de plantillas ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware de logging, JSON y cookie-parser
app.use(logger('dev')); // Para registrar solicitudes HTTP en la consola
app.use(express.json()); // Analiza cuerpos JSON en las solicitudes
app.use(cookieParser()); // Analiza las cookies enviadas en las solicitudes
app.use(express.urlencoded({ extended: true })); // Permite analizar cuerpos de formularios
app.use(express.static(path.join(__dirname, 'public'))); // Define la carpeta 'public' para archivos estáticos

// Configuración de sesión
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'El secreto que queramos nosotros', // Clave secreta para las sesiones
  cookie: { maxAge: null } // Sin persistencia de la sesión después de reiniciar la aplicación
}));

// Agrega methodOverride para permitir métodos PUT y DELETE desde formularios
app.use(methodOverride('_method'));

// Middleware para manejar el consentimiento de cookies
app.use(function(req, res, next) {
  if (req.session.user) { // Si el usuario está logueado, verificamos el valor de acceptedCookies
    res.locals.showCookieBanner = !req.session.user.acceptedCookies;
  } else {
    if (!req.session.acceptedCookies) {
      req.session.acceptedCookies = false; // Si no está logueado, por defecto no ha aceptado las cookies
    }
    res.locals.showCookieBanner = !req.session.acceptedCookies;
  }
  next();
});

// Middleware para pasar el usuario logueado a las vistas
app.use(function(req, res, next) {
  res.locals.user = req.session.user ? users[req.session.user.username] : null;
  next();
});

// Middleware para mostrar mensajes y errores
app.use(function(req, res, next) {
  let error = req.session.error;
  let message = req.session.message;
  delete req.session.error;
  delete req.session.message;
  res.locals.error = "";
  res.locals.message = "";
  if (error) res.locals.error = `<p>${error}</p>`;
  if (message) res.locals.message = `<p>${message}</p>`;
  next();
});

// Definición de rutas
app.use('/', indexRouter); // Página principal
app.use('/login', loginRouter); // Página de inicio de sesión
app.use('/restricted', restrict, restrictedRouter); // Rutas protegidas
app.use('/register', registerRouter); // Registro de nuevos usuarios
app.use('/chat', restrict, chatRouter); // Chat grupal
app.use('/userlist', restrict, userlistRouter); // Listado de usuarios
app.use('/passwordGenerator', restrict, passwordGeneratorRouter); // Generador de contraseñas
app.use('/orders', restrict, ordersRouter); // Gestión de pedidos
app.use('/ordersObject', restrict, ordersObjectRouter); // Gestión de pedidos con objetos
app.use('/chatPrivate', restrict, chatPrivateRouter); // Chat privado entre usuarios

// Ruta para cerrar sesión
app.use('/logout', function(req, res, next) {
  const user = req.session.user;

  // Si el usuario ya había aceptado las cookies, se mantiene el valor en la sesión
  if (user && user.acceptedCookies) {
      req.session.acceptedCookies = true;
  } else {
      req.session.acceptedCookies = false; // Si no, se reinicia a false
  }

  req.session.destroy(function() { // Destruimos la sesión al cerrar sesión
      res.redirect("/");
  });
});

// Middleware de restricción de acceso a rutas
function restrict(req, res, next) {
  if (req.session.user) {
    next(); // Si está logueado, puede acceder
  } else {
    req.session.error = "Unauthorized access"; // Si no, muestra error
    res.redirect("/login");
  }
}

// Ruta para manejar la aceptación de cookies
app.post('/accept-cookies', (req, res) => {
  req.session.acceptedCookies = true; // Se acepta las cookies en la sesión
  if (req.session.user) { // Si el usuario está logueado, también se actualiza en su perfil
      users[req.session.user.username].acceptedCookies = true;
      console.log(`Cookies aceptadas para el usuario ${req.session.user.username}`);
  }
  res.sendStatus(200); // Respuesta exitosa
});

// Middleware para manejar errores 404
app.use(function(req, res, next) {
  next(createError(404)); // Si no se encuentra una ruta, se genera un error 404
});

// Middleware para manejar errores generales
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Mostrar el error solo en desarrollo
  res.status(err.status || 500);
  res.render('error'); // Renderiza la vista de error
});

module.exports = app;