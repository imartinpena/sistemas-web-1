### 6. **Peticiones HTTP y APIs**

El manejo de peticiones HTTP es esencial para interactuar con clientes, servidores y servicios externos. En este apartado aprenderás a trabajar con los métodos más comunes (`GET`, `POST`, `PUT`, `DELETE`), a consumir APIs externas y a manejar errores en las solicitudes HTTP.

---

#### **Peticiones HTTP con Express: `GET`, `POST`, `PUT`, `DELETE`**

1. **`GET`**:
   Se usa para obtener recursos o información del servidor.
   
   **Ejemplo**:
   ```javascript
   app.get('/users', (req, res) => {
     res.json({ message: 'Lista de usuarios' });
   });
   ```

2. **`POST`**:
   Se utiliza para enviar datos al servidor y crear nuevos recursos.
   
   **Ejemplo**:
   ```javascript
   app.post('/users', (req, res) => {
     const newUser = req.body;
     res.status(201).json({ message: 'Usuario creado', user: newUser });
   });
   ```

3. **`PUT`**:
   Se usa para modificar o actualizar un recurso existente.
   
   **Ejemplo**:
   ```javascript
   app.put('/users/:id', (req, res) => {
     const userId = req.params.id;
     const updatedUser = req.body;
     res.json({ message: `Usuario ${userId} actualizado`, user: updatedUser });
   });
   ```

4. **`DELETE`**:
   Se utiliza para eliminar un recurso en el servidor.
   
   **Ejemplo**:
   ```javascript
   app.delete('/users/:id', (req, res) => {
     const userId = req.params.id;
     res.json({ message: `Usuario ${userId} eliminado` });
   });
   ```

---

#### **Consumo de APIs: Uso de `axios` o `fetch` para consumir APIs externas**

Cuando se trabaja con APIs externas, se pueden usar bibliotecas como `axios` para el lado del servidor o `fetch` para el frontend. Ambas permiten realizar peticiones HTTP y manejar respuestas.

1. **Uso de `axios` en Node.js**:
   `axios` es una biblioteca popular para realizar peticiones HTTP desde el servidor.

   **Ejemplo**:
   ```javascript
   const axios = require('axios');

   app.get('/external-api', async (req, res) => {
     try {
       const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
       res.json(response.data);  // Respuesta de la API externa
     } catch (error) {
       res.status(500).json({ error: 'Error al obtener datos de la API' });
     }
   });
   ```

2. **Uso de `fetch` en el frontend**:
   El método `fetch` es nativo en navegadores y se usa para realizar peticiones HTTP desde el lado del cliente.

   **Ejemplo**:
   ```javascript
   fetch('/api/data')
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => console.error('Error:', error));
   ```

---

#### **Manejo de respuestas: Peticiones a APIs REST y manejo de respuestas con JSON**

Las APIs REST permiten la interacción entre sistemas a través de peticiones HTTP, y generalmente devuelven los datos en formato JSON.

1. **Manejo de respuestas JSON**:
   Al manejar peticiones HTTP en Express, puedes devolver respuestas en formato JSON usando `res.json()`.

   **Ejemplo**:
   ```javascript
   app.get('/user/:id', (req, res) => {
     const userId = req.params.id;
     const user = { id: userId, name: 'Juan Pérez', age: 30 };
     res.json(user);  // Devuelve los datos del usuario en formato JSON
   });
   ```

2. **Peticiones a APIs REST**:
   Las APIs REST utilizan métodos HTTP como `GET`, `POST`, `PUT`, `DELETE` para permitir la interacción con un servidor externo.

   **Ejemplo** de una petición a una API REST:
   ```javascript
   app.get('/api/posts', async (req, res) => {
     try {
       const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
       res.json(response.data);
     } catch (error) {
       res.status(500).json({ error: 'Error al obtener los posts' });
     }
   });
   ```

---

#### **Manejo de errores: Tratamiento de errores HTTP con `try/catch`**

El manejo adecuado de errores en las peticiones HTTP asegura que la aplicación no falle inesperadamente y proporcione respuestas claras al cliente.

1. **Uso de `try/catch`**:
   Para manejar errores en peticiones asíncronas, es importante utilizar bloques `try/catch`.

   **Ejemplo**:
   ```javascript
   app.get('/api/users', async (req, res) => {
     try {
       const response = await axios.get('https://jsonplaceholder.typicode.com/users');
       res.json(response.data);
     } catch (error) {
       console.error(error.message);
       res.status(500).json({ error: 'Error al obtener usuarios' });
     }
   });
   ```

2. **Errores específicos en peticiones HTTP**:
   Puedes devolver diferentes códigos de estado HTTP según el tipo de error:

   - **400**: Solicitud incorrecta.
   - **401**: No autenticado.
   - **403**: Prohibido.
   - **404**: No encontrado.
   - **500**: Error interno del servidor.

   **Ejemplo**:
   ```javascript
   app.get('/external-api', async (req, res) => {
     try {
       const response = await axios.get('https://jsonplaceholder.typicode.com/users');
       res.json(response.data);
     } catch (error) {
       if (error.response) {
         res.status(error.response.status).json({ message: error.response.statusText });
       } else {
         res.status(500).json({ error: 'Error interno del servidor' });
       }
     }
   });
   ```

---

### **Ejemplo práctico de examen**

**Pregunta de examen**: *"Crea una ruta en Express que consuma una API externa usando `axios`. La ruta debe manejar correctamente posibles errores de la API y devolver los datos obtenidos en formato JSON."*

**Solución**:
```javascript
const axios = require('axios');
const express = require('express');
const app = express();

app.get('/external-api', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({ message: error.response.statusText });
    } else {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
```

---

### **Resumen del apartado Peticiones HTTP y APIs**:

1. **Peticiones HTTP en Express**:
   - Los métodos más usados son `GET`, `POST`, `PUT` y `DELETE` para manejar diferentes acciones en el servidor.
   - Uso de `req.body`, `req.params`, y `req.query` para acceder a los datos.

2. **Consumo de APIs externas**:
   - Uso de `axios` en Node.js y `fetch` en el frontend para realizar peticiones a APIs externas.
   - Las respuestas generalmente son en formato JSON, lo que permite un intercambio eficiente de datos.

3. **Manejo de errores**:
   - Es fundamental utilizar bloques `try/catch` para capturar errores y devolver códigos de estado HTTP apropiados.
   - Devuelve respuestas claras con `res.status()` para informar al cliente sobre el error.
