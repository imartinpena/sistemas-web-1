function deleteUser(username) {
    fetch('/userlist/deleteUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username }) // Enviar el nombre de usuario a eliminar
    })
    .then(response => {
        if (response.ok) {
            window.location.reload(); // Recargar la página para mostrar la lista de usuarios actualizada
        } else {
            response.text().then(data => alert(data)); // Mostrar mensaje de error si ocurre un problema
        }
    })
    .catch(error => {
        console.error('Error al eliminar usuario:', error); // Registrar el error en la consola
    });
}