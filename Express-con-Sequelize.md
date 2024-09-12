### 18. **Express con Sequelize (Opcional)**

**Sequelize** es un ORM que permite interactuar fácilmente con bases de datos SQL desde una aplicación Express en Node.js, usando un enfoque basado en objetos. Este apartado abarca la configuración, el uso de operaciones CRUD y la gestión de relaciones entre tablas.

---

#### **1. Integración de Sequelize en un proyecto Express**

1. **Instalación de Sequelize y dependencias**:
   Para trabajar con Sequelize y una base de datos como MySQL, PostgreSQL, SQLite, u otras, es necesario instalar las dependencias:
   ```bash
   npm install sequelize
   npm install mysql2  # Dependencia del cliente MySQL (puedes cambiar por otro cliente si usas PostgreSQL, SQLite, etc.)
   ```

2. **Configuración básica de Sequelize**:
   En tu proyecto, es conveniente tener un archivo que maneje la configuración de la conexión a la base de datos, como `db.js`:
   ```javascript
   const { Sequelize } = require('sequelize');

   const sequelize = new Sequelize('nombre_bd', 'usuario', 'contraseña', {
     host: 'localhost',
     dialect: 'mysql',  // Cambia por 'postgres', 'sqlite', etc., según la base de datos que uses
   });

   sequelize.authenticate()
     .then(() => {
       console.log('Conexión a la base de datos exitosa');
     })
     .catch(err => {
       console.error('Error al conectar a la base de datos:', err);
     });

   module.exports = sequelize;
   ```

---

#### **2. Operaciones CRUD con Sequelize**

Una vez que has integrado Sequelize, puedes definir modelos para representar las tablas en la base de datos y realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar).

1. **Definición de modelos**:
   Los modelos en Sequelize se corresponden con las tablas de la base de datos. Aquí tienes un ejemplo de un modelo de `User` que contiene campos básicos como `username`, `email`, y `password`.

   ```javascript
   const { DataTypes } = require('sequelize');
   const sequelize = require('./db');  // Conexión a la base de datos

   const User = sequelize.define('User', {
     username: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     email: {
       type: DataTypes.STRING,
       allowNull: false,
       unique: true,  // El correo debe ser único
     },
     password: {
       type: DataTypes.STRING,
       allowNull: false,
     },
   });

   module.exports = User;
   ```

2. **Operaciones CRUD**:

   - **Crear (Create)**:
     ```javascript
     User.create({
       username: 'john_doe',
       password: 'password123',
       email: 'john@example.com',
     })
     .then(user => console.log(user))
     .catch(err => console.error(err));
     ```

   - **Leer (Read)**:
     ```javascript
     // Obtener todos los usuarios
     User.findAll()
       .then(users => console.log(users))
       .catch(err => console.error(err));

     // Obtener un usuario por su ID
     User.findByPk(1)
       .then(user => console.log(user))
       .catch(err => console.error(err));
     ```

   - **Actualizar (Update)**:
     ```javascript
     User.update({ email: 'new_email@example.com' }, {
       where: { id: 1 }
     })
     .then(() => console.log('Usuario actualizado'))
     .catch(err => console.error(err));
     ```

   - **Eliminar (Delete)**:
     ```javascript
     User.destroy({
       where: { id: 1 }
     })
     .then(() => console.log('Usuario eliminado'))
     .catch(err => console.error(err));
     ```

---

#### **3. Relaciones entre tablas con Sequelize**

Sequelize permite definir relaciones entre diferentes tablas, como **uno a muchos**, **uno a uno**, o **muchos a muchos**.

1. **Relaciones uno a muchos**:
   Supón que tienes un modelo `User` y un modelo `Post`, donde un usuario puede tener varios posts.

   **Definir relación uno a muchos**:
   ```javascript
   const Post = sequelize.define('Post', {
     title: DataTypes.STRING,
     content: DataTypes.TEXT,
   });

   // Un usuario puede tener muchos posts
   User.hasMany(Post);
   // Un post pertenece a un usuario
   Post.belongsTo(User);
   ```

2. **Relaciones muchos a muchos**:
   Para relaciones muchos a muchos (por ejemplo, productos y categorías), puedes definir una tabla intermedia.

   **Definir relación muchos a muchos**:
   ```javascript
   const Product = sequelize.define('Product', {
     name: DataTypes.STRING,
   });

   const Category = sequelize.define('Category', {
     name: DataTypes.STRING,
   });

   // Relación muchos a muchos con tabla intermedia
   Product.belongsToMany(Category, { through: 'ProductCategories' });
   Category.belongsToMany(Product, { through: 'ProductCategories' });
   ```

---

### **Ejemplo práctico de examen**

**Pregunta de examen**: *"Crea un modelo `User` y un modelo `Post` usando Sequelize. Un usuario puede tener múltiples posts. Implementa una ruta para listar todos los usuarios y sus posts asociados."*

**Solución**:

1. **Definir los modelos** (`models/User.js` y `models/Post.js`):
   ```javascript
   const { DataTypes } = require('sequelize');
   const sequelize = require('../db');  // Conexión a la base de datos

   const User = sequelize.define('User', {
     username: DataTypes.STRING,
     email: DataTypes.STRING,
     password: DataTypes.STRING,
   });

   const Post = sequelize.define('Post', {
     title: DataTypes.STRING,
     content: DataTypes.TEXT,
   });

   User.hasMany(Post);  // Un usuario tiene muchos posts
   Post.belongsTo(User);  // Un post pertenece a un usuario

   module.exports = { User, Post };
   ```

2. **Rutas para listar usuarios y posts** (`routes/users.js`):
   ```javascript
   const express = require('express');
   const router = express.Router();
   const { User, Post } = require('../models');

   router.get('/users', async (req, res) => {
     try {
       const users = await User.findAll({
         include: Post  // Incluye los posts asociados
       });
       res.json(users);
     } catch (err) {
       res.status(500).send('Error al obtener los usuarios');
     }
   });

   module.exports = router;
   ```

3. **Integrar la ruta en `app.js`**:
   ```javascript
   const usersRouter = require('./routes/users');
   app.use('/api', usersRouter);
   ```

---

### **Resumen del apartado Express con Sequelize**

1. **Integración de Sequelize**:
   - Instala las dependencias necesarias (`sequelize` y el cliente de la base de datos).
   - Configura la conexión en el archivo `db.js`.

2. **Operaciones CRUD**:
   - Crea, lee, actualiza y elimina registros usando los métodos de Sequelize (`create`, `findAll`, `update`, `destroy`).
   - Define los modelos usando `Sequelize.define`.

3. **Relaciones entre tablas**:
   - **Relación uno a muchos**: Usa `hasMany` y `belongsTo` para definir estas relaciones.
   - **Relación muchos a muchos**: Usa `belongsToMany` y una tabla intermedia para definir esta relación.
