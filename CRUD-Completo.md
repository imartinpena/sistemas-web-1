### 15. **CRUD Completo**

CRUD es el conjunto de las cuatro operaciones básicas de manipulación de datos en bases de datos o aplicaciones web: **Crear (Create)**, **Leer (Read)**, **Actualizar (Update)**, y **Eliminar (Delete)**. En un proyecto basado en Express, se implementan estas operaciones usando las rutas y los métodos HTTP correspondientes.

---

#### **1. Implementación de CRUD**

Cada operación se asocia con un método HTTP diferente:
- **Create (Crear)**: Método `POST` para agregar datos.
- **Read (Leer)**: Método `GET` para obtener datos.
- **Update (Actualizar)**: Método `PUT` o `PATCH` para modificar datos.
- **Delete (Eliminar)**: Método `DELETE` para eliminar datos.

---

#### **2. Rutas CRUD en Express**

El manejo de rutas en Express es esencial para realizar operaciones CRUD. Las siguientes son las rutas típicas para cada operación.

##### **1. Crear (Create) con `POST`**

Para crear un nuevo recurso, se utiliza el método `POST`. Este método se emplea para enviar datos al servidor y generar un nuevo recurso, por ejemplo, un nuevo pedido o usuario.

**Ejemplo: Crear un pedido**:
```javascript
const express = require('express');
const router = express.Router();

let pedidos = [];  // Almacena pedidos en un array en memoria

// Crear un nuevo pedido
router.post('/pedidos', (req, res) => {
  const { cliente, productos } = req.body;  // Obtener datos del cuerpo de la solicitud
  const nuevoPedido = {
    id: pedidos.length + 1,
    cliente,
    productos,
    fecha: new Date().toISOString(),
    estado: 'Pendiente'
  };
  pedidos.push(nuevoPedido);  // Añadir el nuevo pedido al array
  res.status(201).json(nuevoPedido);  // Devolver el nuevo pedido creado
});

module.exports = router;
```

##### **2. Leer (Read) con `GET`**

Para leer datos, se utiliza el método `GET`, que permite recuperar todos los registros o uno en particular.

**Ejemplo: Obtener todos los pedidos**:
```javascript
// Obtener todos los pedidos
router.get('/pedidos', (req, res) => {
  res.json(pedidos);  // Devolver todos los pedidos en formato JSON
});
```

**Ejemplo: Obtener un pedido específico por su ID**:
```javascript
// Obtener un pedido por ID
router.get('/pedidos/:id', (req, res) => {
  const pedidoId = parseInt(req.params.id);  // Obtener el ID del pedido de los parámetros
  const pedido = pedidos.find(p => p.id === pedidoId);  // Buscar el pedido por ID
  if (pedido) {
    res.json(pedido);  // Devolver el pedido si se encuentra
  } else {
    res.status(404).send('Pedido no encontrado');  // Error si no se encuentra
  }
});
```

##### **3. Actualizar (Update) con `PUT` o `PATCH`**

Para actualizar un recurso existente, se emplea el método `PUT` o `PATCH`. El método `PUT` sobrescribe todo el recurso, mientras que `PATCH` permite modificar solo partes del recurso.

**Ejemplo: Actualizar un pedido**:
```javascript
// Actualizar un pedido por ID
router.put('/pedidos/:id', (req, res) => {
  const pedidoId = parseInt(req.params.id);
  const { cliente, productos, estado } = req.body;  // Obtener datos actualizados del cuerpo de la solicitud
  const pedido = pedidos.find(p => p.id === pedidoId);  // Buscar el pedido por ID

  if (pedido) {
    // Actualizar los campos del pedido
    pedido.cliente = cliente || pedido.cliente;
    pedido.productos = productos || pedido.productos;
    pedido.estado = estado || pedido.estado;

    res.json(pedido);  // Devolver el pedido actualizado
  } else {
    res.status(404).send('Pedido no encontrado');  // Error si no se encuentra el pedido
  }
});
```

##### **4. Eliminar (Delete) con `DELETE`**

Para eliminar un recurso, se utiliza el método `DELETE`. Esto elimina el recurso indicado y devuelve una respuesta de éxito o error.

**Ejemplo: Eliminar un pedido**:
```javascript
// Eliminar un pedido por ID
router.delete('/pedidos/:id', (req, res) => {
  const pedidoId = parseInt(req.params.id);
  const pedidoIndex = pedidos.findIndex(p => p.id === pedidoId);  // Encontrar el índice del pedido

  if (pedidoIndex !== -1) {
    pedidos.splice(pedidoIndex, 1);  // Eliminar el pedido del array
    res.status(204).send();  // Respuesta exitosa sin contenido
  } else {
    res.status(404).send('Pedido no encontrado');  // Error si no se encuentra el pedido
  }
});
```

---

#### **3. Respuestas JSON**

En un CRUD moderno, las respuestas suelen enviarse en formato **JSON**, lo que permite que las aplicaciones frontend o los clientes API puedan procesar los datos.

**Ejemplo de respuesta JSON en la creación de un recurso**:
```javascript
res.json({ 
  mensaje: 'Pedido creado con éxito', 
  pedido: nuevoPedido 
});
```

Las respuestas JSON permiten la interacción entre el servidor y los clientes de manera clara y organizada.

---

#### **4. Ejemplo práctico: CRUD para pedidos**

A continuación, te presento un ejemplo completo de un CRUD para manejar un sistema de pedidos. Esto cubre las operaciones básicas de creación, lectura, actualización y eliminación de pedidos.

**Archivo `routes/pedidos.js` completo**:
```javascript
const express = require('express');
const router = express.Router();

let pedidos = [];

// Crear un nuevo pedido
router.post('/pedidos', (req, res) => {
  const { cliente, productos } = req.body;
  const nuevoPedido = {
    id: pedidos.length + 1,
    cliente,
    productos,
    fecha: new Date().toISOString(),
    estado: 'Pendiente'
  };
  pedidos.push(nuevoPedido);
  res.status(201).json(nuevoPedido);
});

// Obtener todos los pedidos
router.get('/pedidos', (req, res) => {
  res.json(pedidos);
});

// Obtener un pedido por ID
router.get('/pedidos/:id', (req, res) => {
  const pedidoId = parseInt(req.params.id);
  const pedido = pedidos.find(p => p.id === pedidoId);
  if (pedido) {
    res.json(pedido);
  } else {
    res.status(404).send('Pedido no encontrado');
  }
});

// Actualizar un pedido por ID
router.put('/pedidos/:id', (req, res) => {
  const pedidoId = parseInt(req.params.id);
  const { cliente, productos, estado } = req.body;
  const pedido = pedidos.find(p => p.id === pedidoId);

  if (pedido) {
    pedido.cliente = cliente || pedido.cliente;
    pedido.productos = productos || pedido.productos;
    pedido.estado = estado || pedido.estado;
    res.json(pedido);
  } else {
    res.status(404).send('Pedido no encontrado');
  }
});

// Eliminar un pedido por ID
router.delete('/pedidos/:id', (req, res) => {
  const pedidoId = parseInt(req.params.id);
  const pedidoIndex = pedidos.findIndex(p => p.id === pedidoId);
  if (pedidoIndex !== -1) {
    pedidos.splice(pedidoIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Pedido no encontrado');
  }
});

module.exports = router;
```

---

### **Resumen del apartado CRUD Completo**

1. **Create (Crear)**: Se utiliza `POST` para crear un nuevo recurso.
2. **Read (Leer)**: Se utiliza `GET` para obtener recursos (todos o uno específico).
3. **Update (Actualizar)**: Se utiliza `PUT` o `PATCH` para modificar un recurso existente.
4. **Delete (Eliminar)**: Se utiliza `DELETE` para eliminar un recurso.
5. **Respuestas JSON**: Se utilizan para devolver datos en operaciones CRUD, permitiendo una comunicación clara entre el servidor y el cliente.
