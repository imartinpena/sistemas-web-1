### 14. **Promesas, Async-Await, y Callbacks**

En JavaScript, el manejo de la asincronía es crucial para realizar tareas que pueden tardar, como acceder a bases de datos o realizar peticiones a servidores, sin bloquear el hilo principal. Las tres técnicas clave para manejar el código asíncrono son los **callbacks**, las **promesas** y el uso de **async/await**.

---

#### **1. Callbacks**

Un **callback** es una función que se pasa como argumento a otra función y se ejecuta cuando la operación ha terminado. El callback es una de las formas más antiguas y básicas de manejar la asincronía, pero puede llevar al problema de "callback hell" cuando se anidan muchos callbacks.

**Ejemplo de callback**:
```javascript
// Simulación de una operación asíncrona usando setTimeout
function leerArchivo(ruta, callback) {
  setTimeout(() => {
    console.log(`Archivo leído desde: ${ruta}`);
    callback();  // Ejecuta el callback cuando la operación ha terminado
  }, 1000);
}

console.log('Inicio');
leerArchivo('/ruta/del/archivo.txt', () => {
  console.log('Lectura completada');
});
console.log('Fin');
```

**Salida esperada**:
```
Inicio
Fin
Archivo leído desde: /ruta/del/archivo.txt
Lectura completada
```

---

#### **2. Promesas**

Las **promesas** representan el eventual resultado de una operación asíncrona. Una promesa puede estar en uno de tres estados: **pending** (pendiente), **fulfilled** (cumplida), o **rejected** (rechazada).

**Creación de una promesa**:
```javascript
// Función que devuelve una promesa
function leerArchivo(ruta) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ruta) {
        resolve(`Archivo leído desde: ${ruta}`);
      } else {
        reject('Error: Ruta no válida');
      }
    }, 1000);
  });
}

console.log('Inicio');

leerArchivo('/ruta/del/archivo.txt')
  .then(resultado => {
    console.log(resultado);  // Maneja la promesa cumplida
  })
  .catch(error => {
    console.log(`Error: ${error}`);  // Maneja la promesa rechazada
  })
  .finally(() => {
    console.log('Proceso finalizado');
  });

console.log('Fin');
```

**Salida esperada**:
```
Inicio
Fin
Archivo leído desde: /ruta/del/archivo.txt
Proceso finalizado
```

**Explicación**:
- **resolve**: Indica que la operación ha tenido éxito.
- **reject**: Indica que ha ocurrido un error en la operación.

---

#### **3. async/await**

`async/await` es una forma más moderna de manejar promesas, que permite escribir código asíncrono como si fuera síncrono. `await` espera la resolución de una promesa, y `async` marca una función como asíncrona, lo que permite el uso de `await` dentro de ella.

**Ejemplo de uso de async/await**:
```javascript
async function ejecutar() {
  console.log('Inicio');

  try {
    const resultado = await leerArchivo('/ruta/del/archivo.txt');
    console.log(resultado);
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  console.log('Fin');
}

ejecutar();
```

**Salida esperada**:
```
Inicio
Archivo leído desde: /ruta/del/archivo.txt
Fin
```

**Ventajas de async/await**:
- El código es más legible y fácil de mantener.
- Permite manejar errores de manera más clara con `try/catch`.

---

#### **4. Manejo de errores asíncronos con try/catch**

Al usar `async/await`, los errores se manejan utilizando bloques `try/catch`, lo que permite capturar cualquier error que ocurra en la operación asíncrona.

**Ejemplo con manejo de errores**:
```javascript
async function ejecutarConError() {
  console.log('Inicio');

  try {
    const resultado = await leerArchivo('');  // Esta línea provocará un error
    console.log(resultado);
  } catch (error) {
    console.log(`Error capturado: ${error}`);
  }

  console.log('Fin');
}

ejecutarConError();
```

**Salida esperada**:
```
Inicio
Error capturado: Error: Ruta no válida
Fin
```

---

#### **5. Ejemplo de examen: Leer archivo con Promesas y async/await**

**Pregunta de examen**: *"Implementa una función que lea un archivo de manera asíncrona usando promesas, y luego modifícala para usar `async/await`."*

**Solución**:

1. **Usando Promesas**:
   ```javascript
   const fs = require('fs').promises;

   function leerArchivo(ruta) {
     return fs.readFile(ruta, 'utf8')
       .then(data => {
         console.log('Archivo leído:', data);
       })
       .catch(error => {
         console.log('Error al leer el archivo:', error);
       });
   }

   leerArchivo('archivo.txt');
   ```

2. **Usando async/await**:
   ```javascript
   const fs = require('fs').promises;

   async function leerArchivoAsync(ruta) {
     try {
       const data = await fs.readFile(ruta, 'utf8');
       console.log('Archivo leído:', data);
     } catch (error) {
       console.log('Error al leer el archivo:', error);
     }
   }

   leerArchivoAsync('archivo.txt');
   ```

---

### **Resumen del apartado:**

1. **Callbacks**:
   - Forma tradicional de manejar asincronía.
   - Puede generar "callback hell" cuando se anidan múltiples callbacks.

2. **Promesas**:
   - Una promesa es un objeto que representa una operación asíncrona.
   - Se maneja usando `.then()` para operaciones exitosas y `.catch()` para errores.
   - `.finally()` se ejecuta después de que la promesa ha sido cumplida o rechazada.

3. **async/await**:
   - Sintaxis más moderna y legible para manejar promesas.
   - `async` declara una función asíncrona y `await` espera que una promesa se resuelva.
   - Los errores se manejan con `try/catch`.

4. **Manejo de errores asíncronos**:
   - Capturar errores en las promesas con `.catch()` o usando `try/catch` en funciones `async`.
