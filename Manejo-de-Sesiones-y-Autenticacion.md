### 4. **Manejo de Sesiones y Autenticación**

Este apartado cubre cómo gestionar sesiones, proteger rutas y manejar la autenticación de usuarios en un proyecto de Node.js con Express. Estos conceptos son clave para cualquier aplicación que requiera autenticación de usuarios.

---

#### **express-session: Configuración y uso para mantener sesiones**

`express-session` es un middleware que permite almacenar y gestionar datos de sesión de usuario en una aplicación Express.

1. **Configuración básica de `express-session` en `app.js`**:
   ```javascript
   const session = require('express-session');

   app.use(session({
     secret: 'mi-secreto',        // Clave secreta para firmar la cookie de sesión
     resave: false,               // No guardar la sesión si no hay cambios
     saveUninitialized: false,    // No guardar sesiones vacías
     cookie: { maxAge: 60000 }    // Tiempo de expiración de la cookie (en milisegundos)
   }));
   ```

   - **`secret`**: Se usa para firmar la cookie de sesión.
   - **`resave`**: No guarda la sesión si no ha habido modificaciones.
   - **`saveUninitialized`**: No guarda sesiones vacías.
   - **`cookie.maxAge`**: Define cuánto tiempo permanece activa la cookie antes de expirar.

---

#### **bcrypt: Hashing de contraseñas**

`bcrypt` se usa para proteger contraseñas mediante hashing antes de almacenarlas en la base de datos. Almacenar contraseñas en texto plano es peligroso, y `bcrypt` permite generar un hash seguro.

1. **Hashing de contraseñas con `bcrypt`**:
   ```javascript
   const bcrypt = require('bcrypt');

   const registerUser = (username, password, callback) => {
     bcrypt.hash(password, 10, (err, hash) => {
       if (err) throw err;
       // Guardar el hash en lugar de la contraseña original
       users[username] = { username, passwordHash: hash };
       callback();
     });
   };
   ```

2. **Verificación de contraseña en el login**:
   ```javascript
   const loginUser = (username, password, callback) => {
     const user = users[username];
     if (!user) {
       return callback(null, false); // Usuario no encontrado
     }

     // Comparar contraseña ingresada con el hash almacenado
     bcrypt.compare(password, user.passwordHash, (err, isMatch) => {
       if (err) throw err;
       callback(null, isMatch); // Retorna `true` si coinciden
     });
   };
   ```

---

#### **Login y Logout: Autenticación de usuarios y manejo de sesiones**

1. **Ruta de login**:
   Verifica las credenciales y crea una sesión para el usuario.

   ```javascript
   app.post('/login', (req, res) => {
     const { username, password } = req.body;

     loginUser(username, password, (err, isMatch) => {
       if (isMatch) {
         req.session.user = { username };  // Iniciar sesión
         res.redirect('/dashboard');
       } else {
         res.status(401).send('Credenciales incorrectas');
       }
     });
   });
   ```

2. **Ruta de logout**:
   Cierra la sesión y redirige al usuario a la página de inicio.

   ```javascript
   app.get('/logout', (req, res) => {
     req.session.destroy((err) => {
       if (err) {
         return res.status(500).send('Error al cerrar sesión');
       }
       res.redirect('/');
     });
   });
   ```

---

#### **Protección de rutas: Middleware para restringir acceso a usuarios autenticados**

1. **Middleware para proteger rutas**:
   Este middleware verifica si un usuario tiene una sesión activa y permite o deniega el acceso según corresponda.

   ```javascript
   const restrict = (req, res, next) => {
     if (req.session.user) {
       next();  // Usuario autenticado, continuar
     } else {
       res.redirect('/login');  // Redirigir al login si no está autenticado
     }
   };

   // Ruta protegida
   app.get('/dashboard', restrict, (req, res) => {
     res.render('dashboard', { user: req.session.user });
   });
   ```

---

#### **Recordar usuario con cookies o sesiones persistentes**

1. **Recordar usuario con cookies en `express-session`**:
   Puedes configurar una cookie con mayor tiempo de expiración para que la sesión se mantenga activa incluso después de cerrar el navegador.

   ```javascript
   app.use(session({
     secret: 'mi-secreto',
     resave: false,
     saveUninitialized: false,
     cookie: { maxAge: 24 * 60 * 60 * 1000 }  // Duración de 24 horas
   }));
   ```

2. **Manejo de cookies personalizadas**:
   Para recordar al usuario, puedes crear una cookie personalizada que almacene información relevante.

   ```javascript
   app.post('/login', (req, res) => {
     const { username, password } = req.body;
     loginUser(username, password, (err, isMatch) => {
       if (isMatch) {
         res.cookie('rememberme', username, { maxAge: 900000, httpOnly: true }); // Crear cookie
         req.session.user = { username };
         res.redirect('/dashboard');
       } else {
         res.status(401).send('Credenciales incorrectas');
       }
     });
   });
   ```

---

### **Ejemplo práctico de examen**

**Pregunta de examen**: *"Crea un sistema de login usando `bcrypt` para el hashing de contraseñas y `express-session` para manejar las sesiones. Protege la ruta `/dashboard` para que solo los usuarios autenticados puedan acceder."*

**Solución**:

1. **Hash de contraseña con `bcrypt`**:
   ```javascript
   const bcrypt = require('bcrypt');

   const registerUser = (username, password, callback) => {
     bcrypt.hash(password, 10, (err, hash) => {
       if (err) throw err;
       users[username] = { username, passwordHash: hash };
       callback();
     });
   };
   ```

2. **Ruta de login**:
   ```javascript
   app.post('/login', (req, res) => {
     const { username, password } = req.body;
     loginUser(username, password, (err, isMatch) => {
       if (isMatch) {
         req.session.user = { username };
         res.redirect('/dashboard');
       } else {
         res.status(401).send('Credenciales incorrectas');
       }
     });
   });
   ```

3. **Ruta de logout**:
   ```javascript
   app.get('/logout', (req, res) => {
     req.session.destroy((err) => {
       res.redirect('/');
     });
   });
   ```

4. **Middleware para proteger rutas**:
   ```javascript
   const restrict = (req, res, next) => {
     if (req.session.user) {
       next();
     } else {
       res.redirect('/login');
     }
   };

   app.get('/dashboard', restrict, (req, res) => {
     res.render('dashboard', { user: req.session.user });
   });
   ```

---

### **Resumen del apartado Manejo de Sesiones y Autenticación**:

1. **express-session**:
   - Middleware que gestiona las sesiones de usuario, almacenando datos entre peticiones.

2. **bcrypt**:
   - Utilizado para el hashing seguro de contraseñas, protegiendo las credenciales de usuario.

3. **Login y Logout**:
   - Login crea la sesión, mientras que Logout destruye la sesión del usuario.

4. **Protección de rutas**:
   - Middleware como `restrict` protege rutas para asegurarse de que solo los usuarios autenticados puedan acceder.

5. **Recordar usuario**:
   - Cookies y sesiones persistentes permiten mantener al usuario autenticado durante más tiempo.
