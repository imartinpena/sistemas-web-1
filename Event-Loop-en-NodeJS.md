### 13. **Event Loop en Node.js**

El **Event Loop** en Node.js es el mecanismo que permite a la plataforma ejecutar código de manera no bloqueante, manejar múltiples operaciones de entrada y salida de manera eficiente, y ejecutar tareas asíncronas en paralelo con las síncronas. Es una parte esencial para comprender cómo funciona Node.js internamente.

---

#### **1. Explicación básica del Event Loop de Node.js**

El Event Loop es el corazón del modelo asíncrono de Node.js. Se encarga de gestionar la ejecución de operaciones asíncronas, como la lectura de archivos, solicitudes HTTP, temporizadores, etc.

**Componentes clave del Event Loop**:
- **Call Stack**: Almacena las funciones a ser ejecutadas.
- **Task Queue**: Almacena las tareas asíncronas listas para ser procesadas.
- **Event Loop**: Supervisa el Call Stack y el Task Queue. Si el Call Stack está vacío, mueve tareas desde la Task Queue al Call Stack.

**Ciclo del Event Loop**:
1. El Event Loop comienza verificando si hay tareas en el Call Stack.
2. Si no hay, toma tareas del Task Queue.
3. Ejecuta las tareas en el Call Stack.
4. Repite el ciclo continuamente.

---

#### **2. Bloqueo del Event Loop**

El bloqueo del Event Loop ocurre cuando una operación síncrona pesada (por ejemplo, un bucle muy largo) ocupa el **Call Stack** y no permite que otras operaciones asíncronas se procesen.

**Ejemplo de tarea que bloquea el Event Loop**:
```javascript
// Tarea pesada que bloquea el Event Loop
function tareaPesada() {
  let suma = 0;
  for (let i = 0; i < 1e9; i++) { // Bucle que tarda mucho en ejecutarse
    suma += i;
  }
  return suma;
}

console.log('Inicio');
console.log(tareaPesada());  // Esta operación bloquea el Event Loop
console.log('Fin');
```

En este ejemplo, `tareaPesada()` bloquea el Event Loop, impidiendo que otras operaciones asíncronas o incluso síncronas (como `console.log('Fin')`) se ejecuten hasta que el bucle termine.

---

#### **3. Manejo de tareas asíncronas**

Node.js ofrece varias funciones para manejar tareas asíncronas sin bloquear el Event Loop:

1. **`setTimeout`**:
   Se usa para ejecutar una función después de un tiempo especificado.

   **Ejemplo**:
   ```javascript
   console.log('Inicio');

   setTimeout(() => {
     console.log('Tarea en setTimeout');
   }, 1000);  // Se ejecuta después de 1 segundo

   console.log('Fin');
   ```

   En este ejemplo, `setTimeout` no bloquea el Event Loop. La función se ejecuta después de 1 segundo, mientras que el resto del código sigue ejecutándose.

2. **`setImmediate`**:
   Ejecuta una función en la siguiente iteración del Event Loop, después de que se procesen todas las tareas actuales.

   **Ejemplo**:
   ```javascript
   console.log('Inicio');

   setImmediate(() => {
     console.log('Tarea en setImmediate');
   });

   console.log('Fin');
   ```

   Aquí, `setImmediate` ejecuta su tarea una vez que se completa el ciclo actual del Event Loop.

3. **`process.nextTick`**:
   Da prioridad a una tarea para que se ejecute **antes** de que el Event Loop procese cualquier otra operación asíncrona. Es útil cuando deseas priorizar una operación sobre las demás en cola.

   **Ejemplo**:
   ```javascript
   console.log('Inicio');

   process.nextTick(() => {
     console.log('Tarea en process.nextTick');
   });

   console.log('Fin');
   ```

   `process.nextTick` se ejecuta antes que cualquier otra tarea asíncrona, como `setImmediate` o `setTimeout`.

---

### **Pregunta práctica de examen**

**Pregunta de examen**: *"Explica el Event Loop en Node.js y proporciona un ejemplo de cómo manejar tareas asíncronas utilizando `setTimeout`, `setImmediate` y `process.nextTick`."*

**Solución**:

1. **Explicación**:
   El Event Loop es el mecanismo que permite a Node.js manejar operaciones asíncronas sin bloquear el hilo principal. Las tareas asíncronas se colocan en la **Task Queue** y son gestionadas por el Event Loop, que las mueve al **Call Stack** cuando está vacío.

2. **Ejemplo práctico**:
   ```javascript
   console.log('Inicio');

   setTimeout(() => {
     console.log('Tarea en setTimeout');
   }, 1000);  // Se ejecuta después de 1 segundo

   setImmediate(() => {
     console.log('Tarea en setImmediate');
   });  // Se ejecuta en la próxima iteración del Event Loop

   process.nextTick(() => {
     console.log('Tarea en process.nextTick');
   });  // Se ejecuta antes que las otras tareas asíncronas

   console.log('Fin');
   ```

   **Salida esperada**:
   ```
   Inicio
   Fin
   Tarea en process.nextTick
   Tarea en setImmediate
   Tarea en setTimeout
   ```

---

### **Resumen del apartado Event Loop en Node.js**:

1. **Event Loop**:
   - El Event Loop es responsable de gestionar las operaciones asíncronas sin bloquear el hilo principal.
   - Se basa en un **Call Stack** y una **Task Queue** para organizar la ejecución del código.

2. **Bloqueo del Event Loop**:
   - Tareas pesadas o costosas como bucles grandes pueden bloquear el Event Loop y retrasar la ejecución de otras tareas.
   - Es recomendable evitar operaciones síncronas muy largas o dividirlas en partes más pequeñas.

3. **Manejo de tareas asíncronas**:
   - **`setTimeout`**: Permite ejecutar tareas asíncronas después de un tiempo específico.
   - **`setImmediate`**: Ejecuta tareas asíncronas en la siguiente iteración del Event Loop.
   - **`process.nextTick`**: Ejecuta tareas con prioridad antes de otras operaciones asíncronas.
