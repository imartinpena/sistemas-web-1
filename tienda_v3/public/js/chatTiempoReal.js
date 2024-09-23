$(function () {
    // Establece la conexión con el servidor de Socket.io
    var socket = io();

    // Enviar mensaje al servidor cuando se envía el formulario
    $('form').submit(function(e) {
        e.preventDefault(); // Previene la recarga de la página al enviar el formulario

        // Emite un evento llamado 'chat message' al servidor con el mensaje y el nombre de usuario
        socket.emit('chat message', { 
            message: $('#input').val(), // Obtiene el valor del campo de entrada (el mensaje que se ha escrito)
            username: username // Inserta el nombre de usuario del cliente (se obtiene del servidor)
        });

        // Limpia el campo de entrada después de enviar el mensaje
        $('#input').val('');
        return false; // Evita cualquier comportamiento adicional del formulario
    });

    // Recibe el historial de mensajes cuando se conecta al servidor
    socket.on('chat history', function(mensajes) {
        // Recorre el array de mensajes recibidos (historial) y los muestra en la lista de mensajes
        mensajes.forEach(function(mensaje) {
            // Agrega cada mensaje en la lista de mensajes con el formato de usuario, mensaje y marca de tiempo
            $('#messages').append($('<li>').html('<strong>' + mensaje.username + ':</strong> ' + mensaje.message + ' <em>(' + mensaje.timestamp + ')</em>'));
        });
    });

    // Recibe los nuevos mensajes que envían otros usuarios en tiempo real
    socket.on('chat message', function(data) {
        // Cada nuevo mensaje se agrega a la lista de mensajes con el formato usuario, mensaje y marca de tiempo
        $('#messages').append($('<li>').html('<strong>' + data.username + ':</strong> ' + data.message + ' <em>(' + data.timestamp + ')</em>'));
    });
});
