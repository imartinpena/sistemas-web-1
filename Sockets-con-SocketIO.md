### 8. **Sockets con Socket.io**

**Socket.io** es una biblioteca que permite la comunicación bidireccional en tiempo real entre clientes y servidores mediante WebSockets. Es ideal para aplicaciones que requieren actualizaciones en tiempo real, como chats, juegos multijugador, y notificaciones en vivo.

---

#### **Configuración básica de Socket.io con Express**

1. **Instalación**:
   Primero, instala `socket.io`:

   ```bash
   npm install socket.io
   ```

2. **Configuración del servidor con Express (`app.js` o `server.js`)**:

   ```javascript
   const express = require('express');
   const http = require('http');
   const socketIo = require('socket.io');
   const app = express();
   const server = http.createServer(app);  // Crear un servidor HTTP estándar
   const io = socketIo(server);  // Iniciar Socket.io en el servidor HTTP

   io.on('connection', (socket) => {
     console.log('Un usuario se ha conectado');

     // Escucha un evento personalizado 'chat message'
     socket.on('chat message', (msg) => {
       io.emit('chat message', msg);  // Envía el mensaje a todos los clientes conectados
     });

     // Escuchar cuando un usuario se desconecta
     socket.on('disconnect', () => {
       console.log('Un usuario se ha desconectado');
     });
   });

   // Iniciar el servidor en el puerto 3000
   server.listen(3000, () => {
     console.log('Servidor escuchando en el puerto 3000');
   });
   ```

3. **Configuración del cliente (en un archivo como `chat.ejs` o `chat.html`)**:

   ```html
   <!DOCTYPE html>
   <html lang="es">
   <head>
     <title>Chat en tiempo real</title>
     <script src="/socket.io/socket.io.js"></script>
   </head>
   <body>
     <h1>Chat en tiempo real</h1>
     <ul id="messages"></ul>
     <form id="form">
       <input id="input" autocomplete="off" /><button>Enviar</button>
     </form>

     <script>
       const socket = io();  // Conectar al servidor de WebSockets

       document.getElementById('form').addEventListener('submit', function(e) {
         e.preventDefault();  // Evita el comportamiento por defecto del formulario
         socket.emit('chat message', document.getElementById('input').value);  // Envía el mensaje al servidor
         document.getElementById('input').value = '';  // Limpia el input
       });

       socket.on('chat message', function(msg) {
         const item = document.createElement('li');
         item.textContent = msg;
         document.getElementById('messages').appendChild(item);  // Añade el mensaje a la lista
       });
     </script>
   </body>
   </html>
   ```

---

#### **Emitir y recibir eventos: Enviar y recibir mensajes entre servidor y cliente**

Socket.io permite manejar eventos de manera sencilla, tanto en el servidor como en el cliente. Los eventos son mensajes que se envían de un lado a otro.

1. **Emitir un evento desde el servidor al cliente**:

   ```javascript
   io.on('connection', (socket) => {
     socket.emit('mensaje', 'Bienvenido al chat');
   });
   ```

2. **Recibir el evento en el cliente**:

   ```javascript
   socket.on('mensaje', (msg) => {
     console.log(msg);  // Muestra el mensaje en la consola del navegador
   });
   ```

---

#### **Chat en tiempo real: Implementación de chat básico**

En este ejemplo, se implementa un chat básico en tiempo real, donde los usuarios pueden enviar mensajes y ver los mensajes de los demás en tiempo real.

1. **Servidor**:

   ```javascript
   io.on('connection', (socket) => {
     console.log('Un usuario se ha conectado');
     
     // Recibir un mensaje de chat desde un cliente
     socket.on('chat message', (msg) => {
       io.emit('chat message', msg);  // Reenviar el mensaje a todos los clientes
     });
   });
   ```

2. **Cliente**:

   ```javascript
   const socket = io();

   document.getElementById('form').addEventListener('submit', function(e) {
     e.preventDefault();  // Previene el comportamiento por defecto
     const mensaje = document.getElementById('input').value;
     socket.emit('chat message', mensaje);  // Envía el mensaje al servidor
     document.getElementById('input').value = '';  // Limpia el campo
   });

   socket.on('chat message', function(msg) {
     const item = document.createElement('li');
     item.textContent = msg;
     document.getElementById('messages').appendChild(item);  // Añade el mensaje a la lista
   });
   ```

---

#### **Eventos personalizados: Uso de eventos como `connect`, `disconnect`, y `typing`**

Además de los eventos predeterminados como `connect` y `disconnect`, Socket.io permite crear eventos personalizados para manejar diversas interacciones en tiempo real, como notificaciones de que un usuario está escribiendo (`typing`).

1. **Evento `typing` para notificar cuando un usuario está escribiendo**:

   - **Servidor**:

     ```javascript
     io.on('connection', (socket) => {
       socket.on('typing', (username) => {
         socket.broadcast.emit('usuarioEscribiendo', `${username} está escribiendo...`);
       });
     });
     ```

   - **Cliente**:

     ```html
     <script>
       const socket = io();
       const input = document.getElementById('input');

       input.addEventListener('input', () => {
         socket.emit('typing', 'Usuario');
       });

       socket.on('usuarioEscribiendo', (msg) => {
         document.getElementById('escribiendo').textContent = msg;  // Muestra "Usuario está escribiendo"
       });
     </script>
     ```

---

### **Ejemplo práctico de examen**

**Pregunta de examen**: *"Implementa un chat en tiempo real utilizando Socket.io y muestra una notificación cuando un usuario esté escribiendo."*

**Solución**:

1. **Servidor (`app.js`)**:

   ```javascript
   const express = require('express');
   const http = require('http');
   const socketIo = require('socket.io');
   const app = express();
   const server = http.createServer(app);
   const io = socketIo(server);

   io.on('connection', (socket) => {
     console.log('Un usuario se ha conectado');

     socket.on('chat message', (msg) => {
       io.emit('chat message', msg);
     });

     socket.on('typing', (username) => {
       socket.broadcast.emit('usuarioEscribiendo', `${username} está escribiendo...`);
     });

     socket.on('disconnect', () => {
       console.log('Un usuario se ha desconectado');
     });
   });

   server.listen(3000, () => {
     console.log('Servidor en el puerto 3000');
   });
   ```

2. **Cliente (`chat.ejs`)**:

   ```html
   <form id="form">
     <input id="input" autocomplete="off" /><button>Enviar</button>
   </form>
   <div id="escribiendo"></div>
   <ul id="messages"></ul>

   <script src="/socket.io/socket.io.js"></script>
   <script>
     const socket = io();

     document.getElementById('form').addEventListener('submit', function(e) {
       e.preventDefault();
       const mensaje = document.getElementById('input').value;
       socket.emit('chat message', mensaje);
       document.getElementById('input').value = '';
     });

     document.getElementById('input').addEventListener('input', function() {
       socket.emit('typing', 'Usuario');
     });

     socket.on('chat message', function(msg) {
       const item = document.createElement('li');
       item.textContent = msg;
       document.getElementById('messages').appendChild(item);
     });

     socket.on('usuarioEscribiendo', function(msg) {
       document.getElementById('escribiendo').textContent = msg;
     });
   </script>
   ```

---

### **Resumen del apartado Sockets con Socket.io**:

1. **Configuración básica de Socket.io**:
   - Configuración del servidor con Socket.io y Express.
   - Configuración del cliente para enviar y recibir mensajes.

2. **Emitir y recibir eventos**:
   - Uso de eventos predeterminados (`connect`, `disconnect`).
   - Creación y uso de eventos personalizados.

3. **Chat en tiempo real**:
   - Implementación de un sistema de chat que permite enviar mensajes en tiempo real entre varios usuarios.

4. **Eventos personalizados**:
   - Implementación de eventos como `typing` para notificar cuando un usuario está escribiendo.
