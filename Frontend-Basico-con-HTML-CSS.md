### 16. **Frontend Básico con HTML-CSS**

El **frontend** es la parte visual y de interacción directa con el usuario en una aplicación web. En este apartado se abordan aspectos fundamentales para construir formularios, tablas, aplicar estilos con **CSS** y utilizar **Bootstrap** para mejorar la apariencia y hacer la interfaz responsive.

---

#### **1. Formularios HTML**

Los **formularios HTML** permiten a los usuarios enviar datos al servidor. Estos formularios están compuestos por varios elementos de entrada (`<input>`, `<select>`, `<textarea>`, etc.) que recogen la información.

**Ejemplo básico de formulario HTML**:
```html
<form action="/register" method="POST">
  <label for="username">Nombre de usuario:</label>
  <input type="text" id="username" name="username" required>

  <label for="email">Correo electrónico:</label>
  <input type="email" id="email" name="email" required>

  <button type="submit">Registrar</button>
</form>
```

**Elementos clave**:
- `action="/register"`: Especifica la URL a la que se enviarán los datos.
- `method="POST"`: Define el método HTTP que se usará para enviar los datos.
- `required`: Valida que el campo sea obligatorio antes de enviar el formulario.

---

#### **2. Tablas HTML**

Las **tablas HTML** se usan para mostrar información estructurada en filas y columnas. Esto es útil para representar datos como listas, reportes, o en escenarios donde la información debe organizarse de forma tabular.

**Ejemplo básico de tabla HTML**:
```html
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Juan Pérez</td>
      <td>juan.perez@email.com</td>
    </tr>
    <tr>
      <td>2</td>
      <td>María López</td>
      <td>maria.lopez@email.com</td>
    </tr>
  </tbody>
</table>
```

**Elementos clave**:
- `<thead>`: Define la cabecera de la tabla.
- `<tbody>`: Contiene las filas de datos.
- `<tr>`: Representa una fila.
- `<td>`: Celda de una tabla donde se colocan los datos.

---

#### **3. Uso de CSS básico**

El **CSS** (Cascading Style Sheets) permite definir el estilo y la presentación de una página web. Los estilos se pueden aplicar a través de selectores que apuntan a etiquetas HTML específicas, clases o identificadores.

**Ejemplo de CSS básico**:
```css
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
}

button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
```

**Características**:
- `border-collapse`: Elimina el espacio entre bordes de celdas de la tabla.
- `padding`: Agrega espacio interno dentro de las celdas.
- `button:hover`: Cambia el color del botón cuando el cursor pasa por encima (hover).

---

#### **4. Uso de Bootstrap**

**Bootstrap** es un framework CSS que simplifica la creación de interfaces web atractivas y responsivas. Incluye una serie de componentes y clases predefinidas que se pueden usar directamente en los elementos HTML.

**Incluir Bootstrap en un proyecto**:
```html
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
```

**Formulario con Bootstrap**:
```html
<form action="/login" method="POST" class="container mt-5">
  <div class="mb-3">
    <label for="username" class="form-label">Nombre de usuario</label>
    <input type="text" id="username" name="username" class="form-control" required>
  </div>

  <div class="mb-3">
    <label for="password" class="form-label">Contraseña</label>
    <input type="password" id="password" name="password" class="form-control" required>
  </div>

  <button type="submit" class="btn btn-primary">Iniciar sesión</button>
</form>
```

**Características**:
- `class="form-control"`: Aplica un estilo específico a los campos de entrada.
- `class="btn btn-primary"`: Define un estilo de botón con el color primario de Bootstrap.
- `container`, `mt-5`, `mb-3`: Son clases de Bootstrap que aplican márgenes y estructura de diseño.

**Tabla con Bootstrap**:
```html
<table class="table table-striped">
  <thead>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Juan Pérez</td>
      <td>juan.perez@email.com</td>
    </tr>
    <tr>
      <td>2</td>
      <td>María López</td>
      <td>maria.lopez@email.com</td>
    </tr>
  </tbody>
</table>
```

**Características**:
- `class="table table-striped"`: Aplica un diseño estilizado y con filas alternadas a la tabla.
  
---

### **Ejemplo práctico para el examen**

**Pregunta de examen**: *"Crea un formulario de registro de usuarios usando Bootstrap, y muestra la lista de usuarios en una tabla también estilizada con Bootstrap."*

**Solución**:

1. **Formulario de registro en `register.ejs`**:
   ```html
   <form action="/register" method="POST" class="container mt-5">
     <div class="mb-3">
       <label for="username" class="form-label">Nombre de usuario</label>
       <input type="text" id="username" name="username" class="form-control" required>
     </div>

     <div class="mb-3">
       <label for="email" class="form-label">Correo electrónico</label>
       <input type="email" id="email" name="email" class="form-control" required>
     </div>

     <button type="submit" class="btn btn-primary">Registrar</button>
   </form>
   ```

2. **Tabla de usuarios en `users.ejs`**:
   ```html
   <table class="table table-striped">
     <thead>
       <tr>
         <th>ID</th>
         <th>Nombre de usuario</th>
         <th>Correo electrónico</th>
       </tr>
     </thead>
     <tbody>
       <% usuarios.forEach(usuario => { %>
         <tr>
           <td><%= usuario.id %></td>
           <td><%= usuario.username %></td>
           <td><%= usuario.email %></td>
         </tr>
       <% }) %>
     </tbody>
   </table>
   ```

En este ejemplo práctico, se utiliza **Bootstrap** para estilizar tanto el formulario como la tabla, asegurando una presentación profesional y atractiva.

---

### **Resumen del apartado Frontend Básico con HTML-CSS**

1. **Formularios HTML**:
   - Creación de formularios con `<input>`, `<button>`, y otros elementos.
   - Envío de datos al servidor con los métodos `POST` y `GET`.

2. **Tablas HTML**:
   - Uso de tablas para mostrar información tabular.
   - Estructura básica con `<thead>`, `<tbody>`, `<tr>`, `<th>`, y `<td>`.

3. **Uso de CSS básico**:
   - Aplicación de estilos simples a elementos HTML con CSS.
   - Ejemplos de estilización de tablas y botones.

4. **Uso de Bootstrap**:
   - Simplificación de la interfaz con clases predefinidas.
   - Ejemplos prácticos para formularios y tablas con Bootstrap.
