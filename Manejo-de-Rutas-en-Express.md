### 2. **Manejo de Rutas en Express**

Este apartado explica cómo gestionar las rutas en Express, incluyendo las solicitudes HTTP más comunes, parámetros, protección de rutas y cómo devolver respuestas JSON. También añadiremos el uso de archivos `.ejs` para las vistas de las rutas.

---

#### **Definición de rutas (`GET`, `POST`, `PUT`, `DELETE`)**

En Express, puedes definir diferentes rutas que respondan a los métodos HTTP. Estos son los más comunes:

- **GET**: Para obtener datos.
- **POST**: Para enviar datos o crear nuevos recursos.
- **PUT**: Para actualizar recursos existentes.
- **DELETE**: Para eliminar recursos.

**Ejemplo**:

```javascript
const express = require('express');
const router = express.Router();

// GET: Obtener un recurso
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Usuario con ID: ${userId}`);
});

// POST: Crear un recurso
router.post('/user', (req, res) => {
  const newUser = req.body;
  res.json({ message: 'Usuario creado', user: newUser });
});

// PUT: Actualizar un recurso
router.put('/user/:id', (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  res.json({ message: `Usuario ${userId} actualizado`, data: updatedData });
});

// DELETE: Eliminar un recurso
router.delete('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `Usuario ${userId} eliminado` });
});

module.exports = router;
```

- **GET**: Para solicitudes de lectura de datos.
- **POST**: Para crear nuevos datos.
- **PUT**: Para actualizar datos existentes.
- **DELETE**: Para eliminar datos.

---

#### **Parámetros en rutas: Uso de `req.params` y `req.query`**

En Express, puedes utilizar **parámetros de ruta** (`req.params`) y **parámetros de consulta** (`req.query`) para manejar datos dinámicos en las URLs.

1. **Parámetros de ruta (`req.params`)**:  
   Son parte de la URL y se capturan utilizando `req.params`.

   ```javascript
   router.get('/product/:id', (req, res) => {
     const productId = req.params.id;
     res.send(`Producto con ID: ${productId}`);
   });
   ```

   Si visitas `http://localhost:3000/product/5`, devolverá "Producto con ID: 5".

2. **Parámetros de consulta (`req.query`)**:  
   Son los parámetros que aparecen después del signo `?` en la URL y se capturan usando `req.query`.

   ```javascript
   router.get('/search', (req, res) => {
     const query = req.query.q;
     res.send(`Buscando: ${query}`);
   });
   ```

   Si visitas `http://localhost:3000/search?q=camisas`, devolverá "Buscando: camisas".

---

#### **Rutas protegidas: Uso de middleware para proteger rutas**

El **middleware** se utiliza para proteger rutas a las que solo deben acceder usuarios autenticados. Esto garantiza que solo los usuarios que han iniciado sesión puedan acceder a ciertas partes del sitio.

**Ejemplo**:

```javascript
function restrict(req, res, next) {
  if (req.session.user) {
    next();  // Usuario autenticado, permitir acceso
  } else {
    req.session.error = "Acceso no autorizado";
    res.redirect('/login');  // Redirige al login si no está autenticado
  }
}

// Ruta protegida
router.get('/profile', restrict, (req, res) => {
  res.render('profile', { user: req.session.user });
});
```

- **`next()`**: Permite que el middleware avance a la siguiente función si el usuario está autenticado.
- **Redirección al login**: Si no está autenticado, se redirige al formulario de login.

---

#### **Redirección y respuestas JSON: Uso de `res.redirect()` y `res.json()`**

Express permite enviar respuestas en diferentes formatos. Los dos más comunes son redirigir a otra página o devolver datos en formato JSON.

- **`res.redirect()`**: Redirige al cliente a otra ruta o página.
- **`res.json()`**: Envía una respuesta en formato JSON, útil para APIs.

**Ejemplos**:

1. **Redirigir después de un login exitoso**:
   ```javascript
   router.post('/login', (req, res) => {
     const { username, password } = req.body;
     if (authSuccess) {
       req.session.user = { username };  // Guardar usuario en la sesión
       res.redirect('/restricted');  // Redirigir a área restringida
     } else {
       res.redirect('/login');  // Redirigir de vuelta al login si falla
     }
   });
   ```

2. **Enviar una respuesta JSON**:
   ```javascript
   router.get('/api/users', (req, res) => {
     const users = [{ id: 1, name: 'Juan' }, { id: 2, name: 'María' }];
     res.json(users);  // Envía la lista de usuarios en formato JSON
   });
   ```

- **Redirección**: Útil para mover a los usuarios de una página a otra.
- **Respuestas JSON**: Útil para construir APIs y devolver datos dinámicos en aplicaciones cliente-servidor.

---

#### **Uso de archivos `.ejs` en las rutas**

Express utiliza **EJS (Embedded JavaScript)** como motor de vistas para renderizar HTML dinámico. Los archivos `.ejs` permiten mezclar HTML y JavaScript para crear plantillas.

**Ejemplo** de cómo utilizar `.ejs` para mostrar datos:

1. **Vista `profile.ejs`**:
   ```html
   <%- include('header') %>
   <h1>Perfil de <%= user.username %></h1>
   <p>Email: <%= user.email %></p>
   <p>Rol: <%= user.role %></p>
   <%- include('footer') %>
   ```

2. **Renderizar esta vista desde una ruta**:
   ```javascript
   router.get('/profile', restrict, (req, res) => {
     res.render('profile', { user: req.session.user });
   });
   ```

En este ejemplo, el archivo `profile.ejs` utiliza los datos del objeto `user` para mostrar el nombre de usuario, correo electrónico y rol del usuario.

- **`<%= %>`**: Se utiliza para insertar el valor de variables en el HTML.
- **`<%- include()`**: Sirve para incluir otros archivos `.ejs`, como el encabezado (`header.ejs`) y pie de página (`footer.ejs`).

---

### **Ejemplo práctico de examen**

**Pregunta de examen**: *"Crea una ruta protegida `/orders` que devuelva la lista de pedidos en formato JSON. Si el usuario no está autenticado, redirige a la página de login."*

**Solución**:

1. **Definir la ruta en `routes/orders.js`**:
   ```javascript
   const express = require('express');
   const router = express.Router();
   const restrict = require('../middleware/restrict');

   router.get('/', restrict, (req, res) => {
     const orders = [{ id: 1, product: 'Camisa', quantity: 2 }];
     res.json(orders);
   });

   module.exports = router;
   ```

2. **Registrar la ruta en `app.js`**:
   ```javascript
   const ordersRouter = require('./routes/orders');
   app.use('/orders', ordersRouter);
   ```

3. **Middleware `restrict`** para proteger la ruta:
   ```javascript
   function restrict(req, res, next) {
     if (req.session.user) {
       next();  // Usuario autenticado
     } else {
       res.redirect('/login');  // Redirigir al login si no está autenticado
     }
   }
   ```

4. **Vista `orders.ejs`**:
   ```html
   <%- include('header') %>
   <h1>Lista de Pedidos</h1>
   <ul>
     <% orders.forEach(order => { %>
       <li>Pedido ID: <%= order.id %>, Producto: <%= order.product %>, Cantidad: <%= order.quantity %></li>
     <% }) %>
   </ul>
   <%- include('footer') %>
   ```

---

### **Resumen para Manejo de Rutas en Express**:

1. **Definición de rutas**:
   - Manejo de solicitudes `GET`, `POST`, `PUT`, `DELETE`.
   
2. **Parámetros en rutas**:
   - **`req.params`**: Captura parámetros en la URL.
   - **`req.query`**: Captura parámetros de consulta.

3. **Rutas protegidas**:
   - Usar middleware para verificar la autenticación (como `restrict`).

4. **Respuestas**:
   - **`res.redirect()`**: Redirigir al cliente.
   - **`res.json()`**: Devolver datos en formato JSON.

5. **Uso de `EJS`**:
   - Renderizar vistas dinámicas con datos del servidor.
