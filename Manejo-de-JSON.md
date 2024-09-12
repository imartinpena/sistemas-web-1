### 7. **Manejo de JSON**

JSON (JavaScript Object Notation) es un formato ligero de intercambio de datos, que es fácil de leer y escribir tanto para humanos como para máquinas. En el desarrollo web, es común utilizar JSON para enviar y recibir datos entre el servidor y el cliente, o para persistir información en archivos.

---

#### **Estructura de JSON: Objetos y arreglos anidados**

En JSON, los objetos están compuestos de pares clave-valor, y los valores pueden ser de cualquier tipo, como cadenas de texto, números, arreglos y objetos anidados.

1. **Ejemplo básico de JSON con objetos y arreglos anidados**:

```json
{
  "cliente": "Juan Pérez",
  "pedidos": [
    {
      "id": 1,
      "producto": "Camisa",
      "cantidad": 2,
      "precio": 29.99
    },
    {
      "id": 2,
      "producto": "Pantalones",
      "cantidad": 1,
      "precio": 49.99
    }
  ]
}
```

En este ejemplo, se ve cómo un objeto JSON contiene un arreglo de objetos anidados, lo que representa un cliente con sus pedidos.

---

#### **Convertir objetos a JSON: Uso de `JSON.stringify`**

`JSON.stringify()` se usa para convertir un objeto de JavaScript en una cadena de texto en formato JSON, lo cual es útil cuando se quiere enviar datos al servidor o almacenarlos en un archivo.

1. **Ejemplo**:

```javascript
const pedido = {
  cliente: "Juan Pérez",
  total: 109.97
};

const jsonPedido = JSON.stringify(pedido);
console.log(jsonPedido);  // Salida: {"cliente":"Juan Pérez","total":109.97}
```

En este ejemplo, el objeto `pedido` es convertido en una cadena de texto JSON.

---

#### **Convertir JSON a objetos: Uso de `JSON.parse`**

Cuando se recibe un JSON como respuesta de una API o se lee desde un archivo, `JSON.parse()` convierte una cadena en formato JSON a un objeto JavaScript.

1. **Ejemplo**:

```javascript
const jsonString = '{"cliente":"Juan Pérez","total":109.97}';
const pedidoObj = JSON.parse(jsonString);
console.log(pedidoObj.cliente);  // Salida: Juan Pérez
```

Este código convierte una cadena JSON en un objeto JavaScript para poder acceder a sus propiedades.

---

#### **Persistencia en archivos JSON: Lectura y escritura de archivos JSON para almacenamiento de datos**

En Node.js, se puede usar el módulo `fs` (File System) para leer y escribir archivos JSON en el sistema de archivos.

1. **Leer un archivo JSON**:

```javascript
const fs = require('fs');

fs.readFile('pedidos.json', 'utf8', (err, data) => {
  if (err) throw err;
  const pedidos = JSON.parse(data);  // Convierte la cadena JSON a objeto
  console.log(pedidos);
});
```

En este código, se lee el archivo `pedidos.json`, y luego se convierte su contenido en un objeto para trabajar con él.

2. **Escribir en un archivo JSON**:

```javascript
const fs = require('fs');
const nuevoPedido = {
  id: 4,
  cliente: "Carlos García",
  producto: "Chaqueta",
  cantidad: 1,
  precio: 79.99
};

fs.writeFile('pedidos.json', JSON.stringify(nuevoPedido, null, 2), (err) => {
  if (err) throw err;
  console.log('Pedido guardado en pedidos.json');
});
```

Este ejemplo escribe un nuevo pedido en el archivo `pedidos.json`.

---

#### **CRUD en JSON: Ejemplo práctico de Crear, Leer, Actualizar y Eliminar datos**

El CRUD (Create, Read, Update, Delete) en archivos JSON es fundamental para manejar datos de manera dinámica.

1. **Crear (Create)**:

   Añadir un nuevo pedido a un archivo JSON:

   ```javascript
   const fs = require('fs');

   const agregarPedido = (nuevoPedido) => {
     fs.readFile('pedidos.json', 'utf8', (err, data) => {
       if (err) throw err;
       const pedidos = JSON.parse(data);
       pedidos.push(nuevoPedido);  // Añade el nuevo pedido al array
       fs.writeFile('pedidos.json', JSON.stringify(pedidos, null, 2), (err) => {
         if (err) throw err;
         console.log('Pedido agregado');
       });
     });
   };

   const pedidoNuevo = {
     id: 5,
     cliente: "Pedro Fernández",
     producto: "Gorra",
     cantidad: 1,
     precio: 15.99
   };

   agregarPedido(pedidoNuevo);
   ```

2. **Leer (Read)**:

   Leer y mostrar los pedidos almacenados en un archivo JSON:

   ```javascript
   const fs = require('fs');

   const mostrarPedidos = () => {
     fs.readFile('pedidos.json', 'utf8', (err, data) => {
       if (err) throw err;
       const pedidos = JSON.parse(data);
       console.log(pedidos);
     });
   };

   mostrarPedidos();
   ```

3. **Actualizar (Update)**:

   Actualizar la información de un pedido específico:

   ```javascript
   const fs = require('fs');

   const actualizarPedido = (id, nuevosDatos) => {
     fs.readFile('pedidos.json', 'utf8', (err, data) => {
       if (err) throw err;
       let pedidos = JSON.parse(data);
       const index = pedidos.findIndex(pedido => pedido.id === id);
       if (index !== -1) {
         pedidos[index] = { ...pedidos[index], ...nuevosDatos };  // Actualiza los datos
         fs.writeFile('pedidos.json', JSON.stringify(pedidos, null, 2), (err) => {
           if (err) throw err;
           console.log(`Pedido ${id} actualizado`);
         });
       } else {
         console.log('Pedido no encontrado');
       }
     });
   };

   actualizarPedido(2, { cantidad: 3 });
   ```

4. **Eliminar (Delete)**:

   Eliminar un pedido por su ID:

   ```javascript
   const fs = require('fs');

   const eliminarPedido = (id) => {
     fs.readFile('pedidos.json', 'utf8', (err, data) => {
       if (err) throw err;
       let pedidos = JSON.parse(data);
       pedidos = pedidos.filter(pedido => pedido.id !== id);  // Elimina el pedido con el ID especificado
       fs.writeFile('pedidos.json', JSON.stringify(pedidos, null, 2), (err) => {
         if (err) throw err;
         console.log(`Pedido ${id} eliminado`);
       });
     });
   };

   eliminarPedido(1);
   ```

---

### **Ejemplo práctico de examen**

**Pregunta de examen**: *"Implemente un sistema de gestión de pedidos en Node.js que permita agregar, leer, actualizar y eliminar pedidos en un archivo JSON."*

**Solución**: Aquí un ejemplo de código para agregar un pedido utilizando `fs.readFile` y `fs.writeFile`:

```javascript
const fs = require('fs');

const agregarPedido = (nuevoPedido) => {
  fs.readFile('pedidos.json', 'utf8', (err, data) => {
    if (err) throw err;
    const pedidos = JSON.parse(data);
    pedidos.push(nuevoPedido);  // Añadir el nuevo pedido al array
    fs.writeFile('pedidos.json', JSON.stringify(pedidos, null, 2), (err) => {
      if (err) throw err;
      console.log('Pedido agregado');
    });
  });
};

const pedidoNuevo = {
  id: 5,
  cliente: "Pedro Fernández",
  producto: "Sombrero",
  cantidad: 2,
  precio: 24.99
};

agregarPedido(pedidoNuevo);
```

---

### **Resumen del apartado Manejo de JSON**:

1. **Estructura de JSON**:
   - JSON utiliza pares clave-valor.
   - Los objetos y arreglos pueden anidarse.

2. **Convertir objetos a JSON y JSON a objetos**:
   - `JSON.stringify()`: Convierte un objeto JavaScript en una cadena JSON.
   - `JSON.parse()`: Convierte una cadena JSON en un objeto JavaScript.

3. **Lectura y escritura de archivos JSON**:
   - Usa `fs.readFile` para leer archivos JSON.
   - Usa `fs.writeFile` para guardar datos en archivos JSON.

4. **CRUD en JSON**:
   - Crear, Leer, Actualizar y Eliminar datos en archivos JSON con Node.js.
