### 10. **Bases de Datos (Sequelize)**

**Sequelize** es un ORM (Object-Relational Mapping) que facilita la interacción con bases de datos relacionales (como MySQL, PostgreSQL, SQLite, etc.). Permite definir modelos, realizar operaciones CRUD, y manejar relaciones entre tablas de manera sencilla en un proyecto de Express.

---

#### **1. Configuración de Sequelize en Express**

Para usar Sequelize en Express, necesitas instalar Sequelize y el adaptador de base de datos que corresponda (por ejemplo, `mysql2`, `pg`, `sqlite3`).

**Instalación**:
```bash
npm install sequelize
npm install mysql2  # O el adaptador correspondiente
```

Después de instalar las dependencias, puedes configurar Sequelize en tu proyecto.

**Configuración básica de Sequelize en `app.js`**:
```javascript
const Sequelize = require('sequelize');

// Configurar la conexión a la base de datos
const sequelize = new Sequelize('nombre_base_datos', 'usuario', 'contraseña', {
  host: 'localhost',
  dialect: 'mysql'  // O 'postgres', 'sqlite', etc.
});

// Verificar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = sequelize;
```

En este ejemplo:
- `nombre_base_datos` es el nombre de la base de datos.
- `usuario` y `contraseña` son las credenciales de la base de datos.
- `dialect` especifica el tipo de base de datos (como `mysql`, `postgres`, etc.).

---

#### **2. Definición de Modelos: Creación de modelos de datos**

Un **modelo** en Sequelize representa una tabla en la base de datos. Se puede definir usando el método `sequelize.define()`.

**Ejemplo de un modelo de usuario (`models/user.js`)**:
```javascript
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../app');  // Importar la instancia de Sequelize

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true  // Crea 'createdAt' y 'updatedAt'
});

module.exports = User;
```

En este modelo, se definen tres campos (`username`, `password` y `email`), con sus respectivos tipos y restricciones (`allowNull`, `unique`, etc.).

---

#### **3. Operaciones CRUD con Sequelize**

Las operaciones **CRUD (Create, Read, Update, Delete)** son fundamentales para manejar los datos en la base de datos.

1. **Crear un registro**:
   ```javascript
   const User = require('./models/user');

   User.create({
     username: 'john_doe',
     password: '123456',
     email: 'john@example.com'
   })
   .then(user => {
     console.log('Usuario creado:', user);
   })
   .catch(err => {
     console.error('Error creando el usuario:', err);
   });
   ```

2. **Leer registros**:
   ```javascript
   // Obtener todos los usuarios
   User.findAll()
   .then(users => {
     console.log('Usuarios:', users);
   })
   .catch(err => {
     console.error('Error obteniendo usuarios:', err);
   });

   // Obtener un usuario por username
   User.findOne({ where: { username: 'john_doe' } })
   .then(user => {
     console.log('Usuario encontrado:', user);
   })
   .catch(err => {
     console.error('Error obteniendo usuario:', err);
   });
   ```

3. **Actualizar un registro**:
   ```javascript
   User.update({ password: 'new_password' }, { where: { username: 'john_doe' } })
   .then(() => {
     console.log('Contraseña actualizada');
   })
   .catch(err => {
     console.error('Error actualizando el usuario:', err);
   });
   ```

4. **Eliminar un registro**:
   ```javascript
   User.destroy({ where: { username: 'john_doe' } })
   .then(() => {
     console.log('Usuario eliminado');
   })
   .catch(err => {
     console.error('Error eliminando el usuario:', err);
   });
   ```

---

#### **4. Relaciones entre Modelos**

Sequelize permite definir **relaciones** entre los modelos, facilitando el trabajo con bases de datos relacionales.

1. **Relación uno a muchos**:
   Un **usuario** puede tener varios **pedidos** y un **pedido** pertenece a un **usuario**.

   ```javascript
   const User = require('./models/user');
   const Order = require('./models/order');

   // Definir la relación
   User.hasMany(Order, { foreignKey: 'userId' });
   Order.belongsTo(User, { foreignKey: 'userId' });
   ```

2. **Relación muchos a muchos**:
   Un **estudiante** puede inscribirse en varios **cursos**, y un **curso** puede tener varios **estudiantes**.

   ```javascript
   const Student = require('./models/student');
   const Course = require('./models/course');

   // Definir la relación
   Student.belongsToMany(Course, { through: 'StudentCourses' });
   Course.belongsToMany(Student, { through: 'StudentCourses' });
   ```

---

#### **Ejemplo práctico de examen**

**Pregunta de examen**: *"Implementa un sistema de gestión de usuarios y pedidos utilizando Sequelize. Crea un modelo de usuario y un modelo de pedido, y define una relación donde un usuario puede tener varios pedidos."*

**Solución**:

1. **Definir el modelo de usuario (`models/user.js`)**:
   ```javascript
   const { Sequelize, DataTypes } = require('sequelize');
   const sequelize = require('../app');

   const User = sequelize.define('User', {
     username: { type: DataTypes.STRING, allowNull: false },
     email: { type: DataTypes.STRING, allowNull: false },
     password: { type: DataTypes.STRING, allowNull: false }
   });

   module.exports = User;
   ```

2. **Definir el modelo de pedido (`models/order.js`)**:
   ```javascript
   const { Sequelize, DataTypes } = require('sequelize');
   const sequelize = require('../app');

   const Order = sequelize.define('Order', {
     producto: { type: DataTypes.STRING, allowNull: false },
     cantidad: { type: DataTypes.INTEGER, allowNull: false },
     precio: { type: DataTypes.FLOAT, allowNull: false }
   });

   module.exports = Order;
   ```

3. **Definir la relación en `app.js`**:
   ```javascript
   const User = require('./models/user');
   const Order = require('./models/order');

   User.hasMany(Order, { foreignKey: 'userId' });
   Order.belongsTo(User, { foreignKey: 'userId' });

   sequelize.sync({ force: true })
     .then(() => {
       console.log('Tablas creadas en la base de datos');
     });
   ```

4. **Crear y asociar registros**:
   ```javascript
   User.create({
     username: 'jane_doe',
     email: 'jane@example.com',
     password: '12345'
   })
   .then(user => {
     return user.createOrder({ producto: 'Laptop', cantidad: 1, precio: 1200 });
   })
   .then(order => {
     console.log('Pedido creado:', order);
   })
   .catch(err => {
     console.error('Error:', err);
   });
   ```

---

### **Resumen del apartado Bases de Datos (Sequelize)**:

1. **Configuración de Sequelize**:
   - Instalar Sequelize y configurar la conexión con la base de datos.
   - Crear y sincronizar la base de datos.

2. **Definición de Modelos**:
   - Crear modelos que representan las tablas de la base de datos con sus respectivos campos y tipos de datos.

3. **Operaciones CRUD**:
   - Realizar operaciones de Crear, Leer, Actualizar y Eliminar registros en la base de datos.

4. **Relaciones entre Modelos**:
   - Definir relaciones como uno a muchos y muchos a muchos entre los modelos.
