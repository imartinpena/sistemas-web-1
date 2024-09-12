### 11. **Frontend: jQuery y AJAX**

El uso de **jQuery** con **AJAX** permite la comunicación asíncrona con el servidor sin recargar la página. Esto es útil para realizar peticiones HTTP, actualizar dinámicamente el DOM y procesar respuestas del servidor de forma eficiente.

---

#### **1. AJAX con jQuery**

Los métodos principales de jQuery para realizar peticiones AJAX son `$.ajax()`, `$.get()`, y `$.post()`. Estos permiten interactuar con el servidor, enviar y recibir datos, y actualizar la interfaz de usuario sin necesidad de recargar la página.

1. **`$.ajax()`**: Es el método más completo, permitiendo configurar todas las opciones de la petición (URL, método HTTP, datos, callbacks, etc.).

   **Ejemplo**:
   ```javascript
   $.ajax({
     url: '/api/data',        // URL a la que se envía la solicitud
     method: 'GET',           // Método de la solicitud (GET, POST, PUT, DELETE)
     success: function(data) { // Función a ejecutar en caso de éxito
       console.log('Datos recibidos:', data);
     },
     error: function(err) {    // Función a ejecutar en caso de error
       console.error('Error:', err);
     }
   });
   ```

2. **`$.get()`**: Un método más sencillo para realizar peticiones GET.

   **Ejemplo**:
   ```javascript
   $.get('/api/data', function(data) {
     console.log('Datos recibidos:', data);
   });
   ```

3. **`$.post()`**: Similar a `$.get()`, pero usado para enviar datos al servidor mediante POST.

   **Ejemplo**:
   ```javascript
   $.post('/api/data', { name: 'John', age: 30 }, function(response) {
     console.log('Respuesta del servidor:', response);
   });
   ```

---

#### **2. Interacción asíncrona: Actualización de datos sin recargar la página**

AJAX permite enviar datos al servidor y actualizar partes específicas de la página sin realizar una recarga completa. Esto mejora la experiencia de usuario y el rendimiento.

**Ejemplo** de un formulario que envía datos sin recargar la página:

```html
<form id="contactForm">
  <input type="text" id="name" placeholder="Nombre" required>
  <input type="email" id="email" placeholder="Email" required>
  <textarea id="message" placeholder="Mensaje" required></textarea>
  <button type="submit">Enviar</button>
</form>

<div id="response"></div>

<script>
  $('#contactForm').submit(function(event) {
    event.preventDefault();  // Evita que se recargue la página
    
    const formData = {
      name: $('#name').val(),
      email: $('#email').val(),
      message: $('#message').val()
    };
    
    // Enviar los datos al servidor
    $.post('/api/contact', formData, function(response) {
      $('#response').html(response);  // Mostrar respuesta
    });
  });
</script>
```

---

#### **3. Manejo de respuestas: Procesar respuestas JSON en el frontend**

Cuando el servidor devuelve datos en formato JSON, podemos procesarlos directamente en el frontend con jQuery.

**Ejemplo**:

```javascript
$.get('/api/users', function(data) {
  // Asume que el servidor devuelve una lista de usuarios en JSON
  data.forEach(function(user) {
    console.log(`Usuario: ${user.name}, Edad: ${user.age}`);
  });
});
```

En este caso, `data` es la respuesta JSON que contiene la lista de usuarios, y se procesa en el frontend para mostrar sus datos en la consola.

---

#### **4. Dinamismo en el DOM: Renderizado dinámico de datos desde el servidor**

Con AJAX, podemos recibir datos desde el servidor y actualizar el contenido de la página sin necesidad de recargarla.

**Ejemplo** de renderizado dinámico de una lista de productos:

```html
<table id="productTable">
  <thead>
    <tr>
      <th>Producto</th>
      <th>Precio</th>
    </tr>
  </thead>
  <tbody>
    <!-- Aquí se insertarán los productos dinámicamente -->
  </tbody>
</table>

<script>
  $.get('/api/products', function(products) {
    const tableBody = $('#productTable tbody');
    
    // Limpiar el contenido de la tabla antes de agregar datos nuevos
    tableBody.empty();
    
    // Insertar cada producto como una fila de la tabla
    products.forEach(function(product) {
      tableBody.append(`
        <tr>
          <td>${product.name}</td>
          <td>${product.price}</td>
        </tr>
      `);
    });
  });
</script>
```

En este ejemplo, se recibe una lista de productos desde el servidor y se muestra dinámicamente en una tabla HTML.

---

#### **Ejemplo práctico de examen**

**Pregunta de examen**: *"Implementa un formulario para enviar un mensaje al servidor usando AJAX, y muestra un mensaje de confirmación sin recargar la página."*

**Solución**:

1. **Formulario de contacto (`contact.ejs`)**:
   ```html
   <form id="contactForm">
     <input type="text" id="name" placeholder="Nombre" required>
     <input type="email" id="email" placeholder="Email" required>
     <textarea id="message" placeholder="Mensaje" required></textarea>
     <button type="submit">Enviar</button>
   </form>

   <div id="responseMessage"></div>
   ```

2. **Manejo del envío de formulario con AJAX**:
   ```javascript
   $('#contactForm').submit(function(event) {
     event.preventDefault();  // Evita que se recargue la página

     const formData = {
       name: $('#name').val(),
       email: $('#email').val(),
       message: $('#message').val()
     };

     $.post('/api/contact', formData, function(response) {
       $('#responseMessage').html('Mensaje enviado correctamente.');
     });
   });
   ```

3. **Servidor en Express (`routes/api.js`)**:
   ```javascript
   const express = require('express');
   const router = express.Router();

   router.post('/contact', (req, res) => {
     const { name, email, message } = req.body;
     console.log(`Mensaje de: ${name}, Email: ${email}, Mensaje: ${message}`);
     res.send('Gracias por tu mensaje.');
   });

   module.exports = router;
   ```

4. **Integración en `app.js`**:
   ```javascript
   const apiRouter = require('./routes/api');
   app.use('/api', apiRouter);
   ```

---

### **Resumen del apartado Frontend: jQuery y AJAX**:

1. **AJAX con jQuery**:
   - Métodos principales: `$.ajax()`, `$.get()`, `$.post()`.
   - Flexibilidad y uso para hacer peticiones al servidor sin recargar la página.

2. **Interacción asíncrona**:
   - Envío de formularios y actualización de datos sin necesidad de recargar el navegador.

3. **Manejo de respuestas JSON**:
   - Procesar datos en formato JSON recibidos desde el servidor y utilizarlos en el frontend.

4. **Dinamismo en el DOM**:
   - Actualizar y renderizar dinámicamente contenido HTML en función de los datos recibidos desde el servidor.
