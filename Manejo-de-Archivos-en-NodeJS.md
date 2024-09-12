### 9. **Manejo de Archivos en Node.js**

Node.js proporciona el módulo **`fs` (file system)** para trabajar con el sistema de archivos. Este módulo permite realizar operaciones como la lectura, escritura, eliminación y manipulación de archivos. También es común usar archivos JSON para persistir datos en proyectos Node.js, especialmente cuando no se utiliza una base de datos.

---

#### **1. Módulo `fs`: para manejar archivos**

El módulo `fs` se importa en el proyecto para realizar cualquier operación de manipulación de archivos. Debes importarlo al inicio del archivo:

```javascript
const fs = require('fs');
```

---

#### **2. Lectura de archivos: `fs.readFile` y `fs.readFileSync`**

1. **Lectura asíncrona con `fs.readFile`**:
   Este método es **no bloqueante**, lo que significa que otras operaciones pueden seguir ejecutándose mientras el archivo se lee en segundo plano.

   ```javascript
   const fs = require('fs');

   fs.readFile('archivo.txt', 'utf8', (err, data) => {
     if (err) {
       console.error('Error leyendo el archivo:', err);
       return;
     }
     console.log('Contenido del archivo:', data);
   });
   ```

   Aquí, `fs.readFile` toma tres argumentos:
   - El nombre del archivo a leer.
   - El formato de codificación (`utf8` en este caso).
   - Una función de **callback** que maneja el resultado (datos o error).

2. **Lectura sincrónica con `fs.readFileSync`**:
   Este método es **bloqueante**, lo que significa que el código se detiene hasta que la operación de lectura finaliza.

   ```javascript
   const fs = require('fs');

   try {
     const data = fs.readFileSync('archivo.txt', 'utf8');
     console.log('Contenido del archivo:', data);
   } catch (err) {
     console.error('Error leyendo el archivo:', err);
   }
   ```

   En este caso, `fs.readFileSync` devuelve los datos directamente, y cualquier error debe manejarse con un bloque `try/catch`.

---

#### **3. Escritura en archivos: `fs.writeFile` y `fs.writeFileSync`**

1. **Escritura asíncrona con `fs.writeFile`**:
   Permite escribir en archivos de manera asíncrona. Si el archivo no existe, lo crea.

   ```javascript
   const fs = require('fs');

   const data = 'Contenido para escribir en el archivo';

   fs.writeFile('archivo.txt', data, 'utf8', (err) => {
     if (err) {
       console.error('Error escribiendo en el archivo:', err);
       return;
     }
     console.log('Archivo escrito exitosamente');
   });
   ```

   En este caso, se escribe el contenido en un archivo y, al completar la operación, se ejecuta el callback.

2. **Escritura sincrónica con `fs.writeFileSync`**:
   Este método es bloqueante, lo que significa que la operación de escritura debe finalizar antes de continuar con el flujo del programa.

   ```javascript
   const fs = require('fs');

   const data = 'Contenido para escribir de forma sincrónica';

   try {
     fs.writeFileSync('archivo.txt', data, 'utf8');
     console.log('Archivo escrito exitosamente');
   } catch (err) {
     console.error('Error escribiendo en el archivo:', err);
   }
   ```

   Aquí, `fs.writeFileSync` bloquea el código hasta que el archivo se escribe completamente.

---

#### **4. Persistencia de datos en archivos JSON**

En muchas aplicaciones, los datos se almacenan en formato JSON. Para ello, combinamos las operaciones de lectura y escritura de archivos con la manipulación de JSON mediante `JSON.parse()` y `JSON.stringify()`.

1. **Lectura de un archivo JSON**:
   Para leer y manipular un archivo JSON, primero lo leemos como texto y luego lo convertimos en un objeto de JavaScript usando `JSON.parse()`.

   ```javascript
   const fs = require('fs');

   fs.readFile('datos.json', 'utf8', (err, data) => {
     if (err) {
       console.error('Error leyendo el archivo JSON:', err);
       return;
     }
     const jsonData = JSON.parse(data);
     console.log('Datos del archivo JSON:', jsonData);
   });
   ```

2. **Escritura de datos en un archivo JSON**:
   Para escribir un objeto en un archivo JSON, primero convertimos el objeto a JSON con `JSON.stringify()`.

   ```javascript
   const fs = require('fs');

   const datos = {
     nombre: 'Juan Pérez',
     edad: 30,
     profesion: 'Desarrollador'
   };

   fs.writeFile('datos.json', JSON.stringify(datos, null, 2), 'utf8', (err) => {
     if (err) {
       console.error('Error escribiendo en el archivo JSON:', err);
       return;
     }
     console.log('Datos guardados exitosamente en JSON.');
   });
   ```

   Aquí, el segundo parámetro de `JSON.stringify()` (`null, 2`) agrega sangría para hacer el archivo más legible.

---

#### **5. CRUD en JSON: Crear, Leer, Actualizar y Eliminar datos**

1. **Crear**: Agregar un nuevo elemento en el archivo JSON.

   ```javascript
   const fs = require('fs');

   fs.readFile('productos.json', 'utf8', (err, data) => {
     if (err) {
       console.error('Error leyendo el archivo:', err);
       return;
     }
     const productos = JSON.parse(data);
     
     // Añadir un nuevo producto
     productos.push({ id: productos.length + 1, nombre: 'Producto Nuevo', precio: 10.99 });

     fs.writeFile('productos.json', JSON.stringify(productos, null, 2), 'utf8', (err) => {
       if (err) {
         console.error('Error escribiendo el archivo:', err);
         return;
       }
       console.log('Producto añadido correctamente.');
     });
   });
   ```

2. **Leer**: Leer y mostrar datos del archivo JSON.

   ```javascript
   fs.readFile('productos.json', 'utf8', (err, data) => {
     if (err) {
       console.error('Error leyendo el archivo:', err);
       return;
     }
     const productos = JSON.parse(data);
     console.log(productos);
   });
   ```

3. **Actualizar**: Modificar un elemento en el archivo JSON.

   ```javascript
   fs.readFile('productos.json', 'utf8', (err, data) => {
     if (err) {
       console.error('Error leyendo el archivo:', err);
       return;
     }
     const productos = JSON.parse(data);

     // Actualizar el producto con id 1
     const producto = productos.find(p => p.id === 1);
     if (producto) {
       producto.precio = 15.99;
     }

     fs.writeFile('productos.json', JSON.stringify(productos, null, 2), 'utf8', (err) => {
       if (err) {
         console.error('Error escribiendo el archivo:', err);
         return;
       }
       console.log('Producto actualizado correctamente.');
     });
   });
   ```

4. **Eliminar**: Eliminar un elemento del archivo JSON.

   ```javascript
   fs.readFile('productos.json', 'utf8', (err, data) => {
     if (err) {
       console.error('Error leyendo el archivo:', err);
       return;
     }
     let productos = JSON.parse(data);

     // Eliminar el producto con id 1
     productos = productos.filter(p => p.id !== 1);

     fs.writeFile('productos.json', JSON.stringify(productos, null, 2), 'utf8', (err) => {
       if (err) {
         console.error('Error escribiendo el archivo:', err);
         return;
       }
       console.log('Producto eliminado correctamente.');
     });
   });
   ```

---

#### **Ejemplo práctico de examen**

**Pregunta de examen**: *"Crea un programa en Node.js que lea un archivo JSON con una lista de usuarios, permita agregar un nuevo usuario, actualizar la edad de un usuario existente y eliminar un usuario por su ID."*

**Solución**:

1. **Lectura y escritura de usuarios en JSON**:

   ```javascript
   const fs = require('fs');

   // Leer archivo JSON de usuarios
   fs.readFile('usuarios.json', 'utf8', (err, data) => {
     if (err) {
       console.error('Error leyendo el archivo JSON:', err);
       return;
     }
     const usuarios = JSON.parse(data);

     // Agregar nuevo usuario
     usuarios.push({ id: usuarios.length + 1, nombre: 'Nuevo Usuario', edad: 25 });

     // Guardar el archivo actualizado
     fs.writeFile('usuarios.json', JSON.stringify(usuarios, null, 2), 'utf8', (err) => {
       if (err) {
         console.error('Error escribiendo el archivo JSON:', err);
         return;
       }
       console.log('Usuario añadido correctamente.');
     });
   });
   ```

---

### **Resumen del apartado Manejo de Archivos en Node.js**:

1. **Módulo `fs`**:
   - `fs.readFile` y `fs.writeFile` permiten leer y escribir archivos de forma asíncrona.
   - `fs.readFileSync` y `fs.writeFileSync` permiten realizar las mismas operaciones de forma sincrónica.

2. **Lectura y escritura de archivos JSON**:
   - Los datos pueden persistirse en archivos JSON utilizando `JSON.stringify()` y `JSON.parse()`.

3. **Operaciones CRUD en archivos JSON**:
   - Crear, leer, actualizar y eliminar elementos en archivos JSON es un proceso común para manipular datos.
