### 5. **Formularios HTML y Validación**

Los formularios en HTML permiten a los usuarios enviar datos que luego son procesados por el servidor. La validación de los datos es crucial para asegurar que los datos sean correctos tanto en el lado del cliente como en el servidor.

---

#### **Estructura básica de un formulario**

La estructura básica de un formulario HTML incluye elementos como `<form>`, `<input>` y `<button>`, con atributos que definen cómo y dónde se envían los datos.

**Ejemplo básico**:
```html
<form action="/login" method="POST">
  <label for="username">Usuario:</label>
  <input type="text" id="username" name="username" required>

  <label for="password">Contraseña:</label>
  <input type="password" id="password" name="password" required>

  <button type="submit">Iniciar sesión</button>
</form>
```

- **`action`**: Define la URL a la que se envían los datos.
- **`method`**: Define el método HTTP (`GET` o `POST`) usado para enviar los datos.
- **`required`**: Atributo HTML que especifica que un campo es obligatorio.

---

#### **Métodos `POST` y `GET` para el envío de datos**

1. **GET**: Envia los datos a través de la URL. Es visible y se usa para búsquedas o consultas.

**Ejemplo**:
```html
<form action="/search" method="GET">
  <input type="text" name="query" placeholder="Buscar...">
  <button type="submit">Buscar</button>
</form>
```
Esto genera una URL como: `/search?query=valor`.

2. **POST**: Envia los datos en el cuerpo de la solicitud HTTP, adecuado para información sensible como contraseñas.

**Ejemplo**:
```html
<form action="/login" method="POST">
  <input type="text" name="username" placeholder="Usuario" required>
  <input type="password" name="password" placeholder="Contraseña" required>
  <button type="submit">Iniciar sesión</button>
</form>
```

---

#### **Validación del lado del servidor**

La validación del lado del servidor es fundamental para asegurar que los datos recibidos cumplen con los requisitos.

**Ejemplo de validación en Express**:
```javascript
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || username.length < 3) {
    return res.status(400).send('El nombre de usuario debe tener al menos 3 caracteres.');
  }

  if (!password || password.length < 5) {
    return res.status(400).send('La contraseña debe tener al menos 5 caracteres.');
  }

  res.send('Usuario registrado con éxito');
});
```

Este código asegura que el `username` y `password` cumplen ciertos requisitos antes de procesar el registro.

---

#### **Validación del lado del cliente**

La validación del lado del cliente mejora la experiencia de usuario y reduce el número de errores que llegan al servidor.

1. **Validación HTML5**:
   HTML5 ofrece atributos de validación como `required`, `minlength`, `maxlength`, etc.

**Ejemplo**:
```html
<form action="/register" method="POST">
  <input type="text" name="username" required minlength="3" placeholder="Usuario">
  <input type="password" name="password" required minlength="5" placeholder="Contraseña">
  <button type="submit">Registrar</button>
</form>
```

2. **Validación con JavaScript**:
   Usar JavaScript para añadir validaciones personalizadas en tiempo real.

**Ejemplo**:
```html
<form id="registerForm" action="/register" method="POST">
  <input type="text" id="username" name="username" placeholder="Usuario" required>
  <input type="password" id="password" name="password" placeholder="Contraseña" required>
  <button type="submit">Registrar</button>
</form>

<script>
  document.getElementById('registerForm').addEventListener('submit', function(event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username.length < 3) {
      event.preventDefault();
      alert('El nombre de usuario debe tener al menos 3 caracteres.');
    }

    if (password.length < 5) {
      event.preventDefault();
      alert('La contraseña debe tener al menos 5 caracteres.');
    }
  });
</script>
```

---

#### **Formularios dinámicos: Manejo de múltiples campos dinámicos**

En algunos casos, es necesario permitir a los usuarios agregar múltiples entradas dinámicamente. Este ejemplo agrega varios productos a un pedido.

**Ejemplo** de formulario dinámico:
```html
<form action="/addOrder" method="POST" id="orderForm">
  <label for="client">Cliente:</label>
  <input type="text" name="client" required>
  
  <div id="products">
    <div>
      <input type="text" name="products[0].name" placeholder="Producto" required>
      <input type="number" name="products[0].quantity" placeholder="Cantidad" required>
      <input type="number" name="products[0].price" placeholder="Precio" required>
    </div>
  </div>
  
  <button type="button" id="addProduct">Añadir Producto</button>
  <button type="submit">Enviar Pedido</button>
</form>

<script>
  let productIndex = 1;

  document.getElementById('addProduct').addEventListener('click', function() {
    const newProduct = document.createElement('div');
    newProduct.innerHTML = `
      <input type="text" name="products[${productIndex}].name" placeholder="Producto" required>
      <input type="number" name="products[${productIndex}].quantity" placeholder="Cantidad" required>
      <input type="number" name="products[${productIndex}].price" placeholder="Precio" required>
    `;
    document.getElementById('products').appendChild(newProduct);
    productIndex++;
  });
</script>
```

---

### **Ejemplo práctico de examen**

**Pregunta de examen**: *"Crea un formulario para registrar un usuario con validación del lado del cliente y del servidor. Implementa también un sistema para agregar múltiples productos dinámicamente en un pedido."*

**Solución**:

1. **Formulario HTML**:
   ```html
   <form action="/register" method="POST" id="registerForm">
     <input type="text" name="username" required minlength="3" placeholder="Usuario">
     <input type="password" name="password" required minlength="5" placeholder="Contraseña">
     <button type="submit">Registrar</button>
   </form>
   ```

2. **Validación del lado del servidor en Express**:
   ```javascript
   app.post('/register', (req, res) => {
     const { username, password } = req.body;

     if (!username || username.length < 3) {
       return res.status(400).send('El nombre de usuario debe tener al menos 3 caracteres.');
     }

     if (!password || password.length < 5) {
       return res.status(400).send('La contraseña debe tener al menos 5 caracteres.');
     }

     res.send('Usuario registrado con éxito');
   });
   ```

3. **Formulario dinámico con productos**:
   ```html
   <form action="/addOrder" method="POST" id="orderForm">
     <div id="products">
       <!-- Productos dinámicos aquí -->
     </div>
     <button type="button" id="addProduct">Añadir Producto</button>
     <button type="submit">Enviar Pedido</button>
   </form>

   <script>
     let productIndex = 0;

     document.getElementById('addProduct').addEventListener('click', () => {
       const newProduct = document.createElement('div');
       newProduct.innerHTML = `
         <input type="text" name="products[${productIndex}].name" placeholder="Producto" required>
         <input type="number" name="products[${productIndex}].quantity" placeholder="Cantidad" required>
         <input type="number" name="products[${productIndex}].price" placeholder="Precio" required>
       `;
       document.getElementById('products').appendChild(newProduct);
       productIndex++;
     });
   </script>
   ```

---

### **Resumen del apartado Formulario HTML y Validación**:

1. **Estructura básica de un formulario**:
   - Incluye elementos como `<form>`, `<input>`, `<button>` y define un `action` y `method`.

2. **Métodos POST y GET**:
   - `GET`: Muestra los datos en la URL.
   - `POST`: Los datos se envían en el cuerpo de la solicitud, ideal para información sensible.

3. **Validación del lado del servidor**:
   - Se hace para asegurar que los datos son correctos una vez llegan al servidor.

4. **Validación del lado del cliente**:
   - Se puede hacer con HTML5 o JavaScript para mejorar la experiencia de usuario.

5. **Formularios dinámicos**:
   - Permiten agregar múltiples productos o campos dinámicamente con JavaScript.
