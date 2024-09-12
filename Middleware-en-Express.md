### 3. **Middleware en Express**

El middleware en Express es una pieza clave para manejar peticiones HTTP y realizar acciones intermedias antes de que una solicitud llegue a su destino final. Existen diferentes tipos de middleware, como globales, específicos de ruta, personalizados, y también middleware para manejar errores.

---

#### **Middleware global vs. específico de ruta**

1. **Middleware global**:
   Este middleware afecta a todas las rutas de la aplicación y se define usando `app.use()` en el archivo principal de la aplicación (`app.js`).

   **Ejemplo** de middleware global:
   ```javascript
   app.use((req, res, next) => {
     console.log(`Solicitud realizada a: ${req.url}`);
     next();  // Pasa al siguiente middleware o a la ruta correspondiente
   });
   ```

   Este middleware registra cada solicitud realizada a la aplicación y luego pasa al siguiente middleware o ruta usando `next()`.

2. **Middleware específico de ruta**:
   Se aplica solo a rutas específicas.

   **Ejemplo** de middleware específico para una ruta:
   ```javascript
   const checkAdmin = (req, res, next) => {
     if (req.session.user && req.session.user.isAdmin) {
       next();  // Usuario es admin, pasa a la siguiente función
     } else {
       res.redirect('/no-access');  // Redirige si no es admin
     }
   };

   app.get('/admin', checkAdmin, (req, res) => {
     res.send('Bienvenido al panel de administrador');
   });
   ```

   Aquí, el middleware `checkAdmin` se aplica solo a la ruta `/admin`.

---

#### **Middleware personalizado: Validación de entradas y autenticación**

1. **Validación de entradas**:
   El middleware de validación de entradas se usa para verificar que los datos enviados por el cliente estén completos o en el formato adecuado.

   **Ejemplo**:
   ```javascript
   const validateRegistration = (req, res, next) => {
     const { username, password } = req.body;
     if (!username || !password) {
       return res.status(400).send('Faltan campos obligatorios');
     }
     next();  // Si los campos son válidos, pasa a la siguiente función
   };

   app.post('/register', validateRegistration, (req, res) => {
     // Lógica de registro de usuario
     res.send('Usuario registrado con éxito');
   });
   ```

2. **Autenticación**:
   El middleware de autenticación asegura que los usuarios solo puedan acceder a rutas específicas si están autenticados.

   **Ejemplo**:
   ```javascript
   const authenticateUser = (req, res, next) => {
     if (req.session && req.session.user) {
       next();  // Usuario autenticado
     } else {
       res.redirect('/login');  // Redirige si no está autenticado
     }
   };

   app.get('/dashboard', authenticateUser, (req, res) => {
     res.send('Bienvenido al Dashboard');
   });
   ```

---

#### **Autenticación y autorización: Middleware con `express-session`**

`express-session` permite el manejo de sesiones para autenticar y autorizar usuarios.

1. **Configuración básica de `express-session` en `app.js`**:
   ```javascript
   const session = require('express-session');

   app.use(session({
     secret: 'clave-secreta',
     resave: false,
     saveUninitialized: false
   }));
   ```

2. **Protección de rutas con middleware**:
   Este middleware asegura que solo los usuarios autenticados puedan acceder a ciertas rutas.

   **Ejemplo**:
   ```javascript
   const restrict = (req, res, next) => {
     if (req.session.user) {
       next();  // Usuario autenticado
     } else {
       req.session.error = 'Acceso no autorizado';
       res.redirect('/login');
     }
   };

   // Ruta protegida
   app.get('/restricted', restrict, (req, res) => {
     res.render('restricted', { user: req.session.user });
   });
   ```

---

#### **Manejo de errores: Middleware de manejo de errores**

El middleware de manejo de errores captura y gestiona errores que ocurren en la aplicación. Se define con cuatro parámetros: `err`, `req`, `res`, `next`.

**Ejemplo** de manejo de errores global:
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);  // Imprime el error en la consola
  res.status(500).send('Algo salió mal, lo estamos solucionando.');
});
```

En este middleware:
- El parámetro `err` contiene el error.
- `res.status(500)` devuelve un código de error HTTP 500 (Error Interno del Servidor).

---

#### **Uso de `body-parser` para procesar formularios**

El middleware `body-parser` es útil para manejar los datos enviados en formularios (`POST`) o en formato JSON. Desde Express 4.16.0, el uso de `body-parser` está integrado dentro de Express.

1. **Configuración en `app.js`**:
   ```javascript
   app.use(express.urlencoded({ extended: true }));  // Procesa formularios
   app.use(express.json());  // Procesa datos en formato JSON
   ```

2. **Ejemplo de manejo de datos de un formulario**:
   ```html
   <!-- login.ejs -->
   <form action="/login" method="POST">
     <input type="text" name="username" placeholder="Nombre de usuario" required>
     <input type="password" name="password" placeholder="Contraseña" required>
     <button type="submit">Iniciar sesión</button>
   </form>
   ```

   ```javascript
   app.post('/login', (req, res) => {
     const { username, password } = req.body;  // Accede a los datos del formulario
     if (username === 'admin' && password === '12345') {
       req.session.user = { username };  // Guarda el usuario en la sesión
       res.redirect('/dashboard');
     } else {
       res.status(401).send('Credenciales incorrectas');
     }
   });
   ```

---

### **Ejemplo práctico de examen**

**Pregunta de examen**: *"Crea un middleware que valide si el campo 'username' y 'password' de un formulario están completos. Luego crea una ruta que lo use para procesar el registro de usuarios."*

**Solución**:

1. **Middleware de validación (`middlewares/validateUser.js`)**:
   ```javascript
   const validateUser = (req, res, next) => {
     const { username, password } = req.body;
     if (!username || !password) {
       return res.status(400).send('Faltan campos obligatorios');
     }
     next();  // Continúa si los datos son válidos
   };

   module.exports = validateUser;
   ```

2. **Ruta en `routes/register.js`**:
   ```javascript
   const express = require('express');
   const router = express.Router();
   const validateUser = require('../middlewares/validateUser');

   router.post('/', validateUser, (req, res) => {
     const { username, password } = req.body;
     // Lógica de registro
     res.send(`Usuario ${username} registrado con éxito`);
   });

   module.exports = router;
   ```

3. **Integrar el middleware en `app.js`**:
   ```javascript
   const registerRouter = require('./routes/register');
   app.use('/register', registerRouter);
   ```

---

### **Resumen del apartado Middleware en Express**:

1. **Middleware global vs específico de ruta**:
   - El middleware global afecta a todas las rutas.
   - El middleware específico afecta solo a rutas concretas.

2. **Middleware personalizado**:
   - Validación de entradas: Asegura que los campos obligatorios estén presentes.
   - Autenticación: Protege las rutas asegurando que el usuario esté autenticado.

3. **Autenticación con `express-session`**:
   - Usar middleware para proteger rutas.
   - Verifica la sesión del usuario.

4. **Manejo de errores**:
   - Captura y gestiona errores globalmente en la aplicación.

5. **Procesamiento de datos con `body-parser`**:
   - Permite manejar formularios y datos JSON en las solicitudes.
