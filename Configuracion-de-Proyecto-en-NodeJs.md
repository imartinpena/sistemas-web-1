### 1. **Configuración de Proyecto en Node.js**

---

#### **package.json: Creación y manejo de dependencias**

El archivo `package.json` contiene información del proyecto y las dependencias necesarias para que funcione. Aquí es donde se gestionan las bibliotecas de terceros.

- **Instalar dependencias**:
   ```bash
   npm install nombre_paquete
   ```
   Por ejemplo, para instalar `express-validator`:
   ```bash
   npm install express-validator
   ```

- **Estructura básica del archivo `package.json`**:
   ```json
   {
     "name": "tienda",
     "version": "0.0.1",
     "private": true,
     "dependencies": {
       "express": "~4.16.1",
       "bcrypt": "^5.1.0",
       "ejs": "~2.6.1"
     }
   }
   ```

- **Comandos** en `package.json`:
   ```json
   "scripts": {
     "start": "node ./bin/www",
     "dev": "nodemon ./bin/www"
   }
   ```
   - `npm start`: ejecuta el servidor.
   - `npm run dev`: ejecuta el servidor usando `nodemon` para reiniciar automáticamente tras cambios.

---

#### **Express: Configuración básica y uso de `express-generator`**

Express es el framework que usas para crear tu aplicación web. Con `express-generator`, se genera una estructura de proyecto completa, que ya está presente en tu proyecto.

- **Crear un proyecto con `express-generator`**:
   ```bash
   npx express-generator mi-proyecto
   ```

- **Rutas básicas** (ejemplo en tu archivo `app.js`):
   ```javascript
   let indexRouter = require('./routes/index');
   let loginRouter = require('./routes/login');
   let restrictedRouter = require('./routes/restricted');

   app.use('/', indexRouter);
   app.use('/login', loginRouter);
   app.use('/restricted', restrict, restrictedRouter);
   ```

- **Ejemplo de ruta en `/routes/index.js`**:
   ```javascript
   const express = require('express');
   const router = express.Router();

   router.get('/', function(req, res) {
     res.render('index', { title: 'Inicio' });
   });

   module.exports = router;
   ```

---

#### **Dotenv: Manejo de variables de entorno**

Dotenv te permite manejar configuraciones sensibles como puertos, claves API, etc., sin exponerlas en el código fuente.

- **Instalar dotenv**:
   ```bash
   npm install dotenv
   ```

- **Crear archivo `.env`** en la raíz del proyecto:
   ```env
   PORT=3000
   SECRET=miClaveSuperSecreta
   ```

- **Configurar en `app.js`**:
   ```javascript
   require('dotenv').config();
   const port = process.env.PORT || 3000;
   ```

---

#### **Estructura de proyecto: Organización en carpetas**

En tu proyecto Express, tienes una estructura generada automáticamente que facilita el manejo de vistas, rutas y controladores. Aquí está la organización básica que ya tienes en tu proyecto:

```
/routes/             # Define las rutas del proyecto (index.js, login.js, restricted.js)
/views/              # Vistas EJS (index.ejs, login.ejs, etc.)
/public/             # Archivos estáticos como CSS o imágenes (style.css, etc.)
/bin/www             # Configura y escucha el servidor en el puerto
/app.js              # Archivo principal del servidor Express
```

Cada componente (rutas, vistas, lógica de negocio) está en su lugar, lo que hace que el proyecto sea más organizado y escalable.

---

#### **Uso de `nodemon`: Reiniciar el servidor automáticamente**

Nodemon se usa para reiniciar automáticamente el servidor cada vez que detecta cambios en los archivos, lo que facilita el desarrollo.

1. **Instalar nodemon**:
   ```bash
   npm install --save-dev nodemon
   ```

2. **Actualizar `package.json`** para usar nodemon en modo desarrollo:
   ```json
   "scripts": {
     "start": "node ./bin/www",
     "dev": "nodemon ./bin/www"
   }
   ```

3. **Ejecutar el servidor** con `nodemon`:
   ```bash
   npm run dev
   ```

---

### **Ejemplo práctico de examen**

**Pregunta**: *"Dado un proyecto Express ya creado, explica cómo agregarías una nueva ruta `/orders` que cargue una vista mostrando una lista de pedidos del usuario."*

**Pasos**:

1. **Crear la nueva ruta `/routes/orders.js`**:
   ```javascript
   const express = require('express');
   const router = express.Router();

   router.get('/', function(req, res) {
     res.render('orders', { title: 'Lista de Pedidos', user: req.session.user });
   });

   module.exports = router;
   ```

2. **Registrar la ruta en `app.js`**:
   ```javascript
   let ordersRouter = require('./routes/orders');
   app.use('/orders', restrict, ordersRouter);
   ```

3. **Crear la vista `orders.ejs` en `/views/`**:
   ```html
   <%- include('header') %>
   <h1><%= title %></h1>
   <p>Usuario: <%= user.username %></p>
   <%- include('footer') %>
   ```

4. **Usar el middleware `restrict`** (ya presente en `app.js`):
   ```javascript
   function restrict(req, res, next){
     if(req.session.user){
       next();
     } else {
       req.session.error = "Unauthorized access";
       res.redirect("/login");
     }
   }
   ```
