### 17. **Logging y Depuración**

En **Node.js**, es esencial utilizar logging y técnicas de depuración para monitorear el estado de la aplicación, rastrear errores y entender el flujo de las solicitudes HTTP. Existen diferentes formas de implementar logging, desde el uso básico de `console.log()` hasta el uso avanzado de herramientas como **Morgan** y **Winston**.

---

#### **1. Uso de `console.log()` para depuración**

`console.log()` es la herramienta más básica y directa para depurar y verificar el estado de variables y objetos en Node.js.

**Ejemplo básico de `console.log()`**:
```javascript
const nombre = 'Juan';
console.log(`Bienvenido, ${nombre}`);  // Imprime: Bienvenido, Juan
```

Es útil para depurar en tiempo de desarrollo y verificar la ejecución de código.

**Ejemplo en Express**:
```javascript
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  console.log(`Se solicitó el usuario con ID: ${userId}`);
  // Más lógica...
});
```

---

#### **2. Uso de `morgan` para hacer logging de peticiones HTTP**

**Morgan** es un middleware popular que registra cada solicitud HTTP realizada al servidor. Esto ayuda a tener una visión clara de las operaciones que se están ejecutando.

1. **Instalación**:
   ```bash
   npm install morgan
   ```

2. **Configuración en `app.js`**:
   ```javascript
   const express = require('express');
   const morgan = require('morgan');
   const app = express();

   app.use(morgan('dev'));  // El modo 'dev' muestra logs breves y concisos en la consola
   ```

   Morgan tiene diferentes modos, como `'combined'`, `'common'`, `'short'`, etc. El modo `'dev'` es útil para desarrollo porque es conciso y visual.

**Ejemplo en una ruta**:
```javascript
app.use(morgan('combined'));  // Registro detallado

app.get('/orders', (req, res) => {
  res.json({ message: 'Lista de pedidos' });
});
```

Esto permite que cada petición realizada a `/orders` sea registrada con detalles como la URL, el método HTTP y el tiempo de respuesta.

---

#### **3. Manejo de errores y logging avanzado**

El manejo de errores en Express se realiza mediante un middleware especializado para capturar y gestionar errores a lo largo de la aplicación. Además, puedes utilizar herramientas como **Winston** para el logging avanzado de errores.

1. **Middleware de manejo de errores en Express**:
   ```javascript
   app.use((err, req, res, next) => {
     console.error(err.stack);  // Registra el error en la consola
     res.status(500).send('Ocurrió un error en el servidor');
   });
   ```

   Este middleware captura errores, los registra en la consola y responde con un mensaje de error al cliente.

2. **Logging avanzado con `winston`**:
   **Winston** es una herramienta poderosa para el logging en aplicaciones de Node.js. Puedes registrar logs en diferentes niveles (info, warning, error) y almacenarlos en archivos.

   1. **Instalación de `winston`**:
      ```bash
      npm install winston
      ```

   2. **Configuración básica de Winston en `app.js`**:
      ```javascript
      const winston = require('winston');

      const logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
        transports: [
          new winston.transports.File({ filename: 'error.log', level: 'error' }),
          new winston.transports.File({ filename: 'combined.log' })
        ]
      });

      if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
          format: winston.format.simple()
        }));
      }
      ```

   3. **Uso de Winston para registrar errores**:
      ```javascript
      app.use((err, req, res, next) => {
        logger.error(`Error: ${err.message}`);  // Registra los errores en un archivo
        res.status(500).send('Ocurrió un error en el servidor');
      });
      ```

---

### **Ejemplo práctico para el examen**

**Pregunta de examen**: *"Configura un sistema de logging que registre todas las peticiones HTTP usando Morgan y que capture errores del servidor con Winston."*

**Solución**:

1. **Configuración de Morgan** para registrar peticiones HTTP:
   ```javascript
   const express = require('express');
   const morgan = require('morgan');
   const app = express();

   app.use(morgan('combined'));  // Registra todas las peticiones HTTP
   ```

2. **Configuración de Winston para errores**:
   ```javascript
   const winston = require('winston');
   const logger = winston.createLogger({
     level: 'error',
     format: winston.format.combine(
       winston.format.timestamp(),
       winston.format.json()
     ),
     transports: [
       new winston.transports.File({ filename: 'error.log' })
     ]
   });

   app.use((err, req, res, next) => {
     logger.error(err.message);  // Registra el error en un archivo
     res.status(500).send('Error en el servidor');
   });
   ```

---

### **Resumen del apartado Logging y Depuración**

1. **`console.log()`**:
   - Herramienta básica para depuración, rastreo de variables y flujos de la aplicación.
   - Útil para desarrollo, pero debe ser manejado con cuidado en producción.

2. **Morgan**:
   - Middleware para registrar peticiones HTTP.
   - Modos como `'dev'` o `'combined'` según la necesidad de detalle en los logs.

3. **Manejo de errores en Express**:
   - Uso de middleware de errores para capturar y gestionar errores globales.
   - Registro de errores con `console.error()` o herramientas avanzadas.

4. **Logging avanzado con Winston**:
   - Registro de errores en archivos o en diferentes niveles de gravedad.
   - Configuración flexible para logs en consola o archivos.
