const users = require('../users'); // Importar el módulo que gestiona los usuarios

// Middleware para verificar si el nombre de usuario ya está en uso
function checkDuplicateUser(req, res, next) {
    const { user } = req.body; // Obtener el nombre de usuario desde el formulario de registro

    // Obtener todos los usuarios existentes
    const allUsers = users.getAllUsers(); // Devuelve un array de objetos [{ username: 'user1' }, { username: 'user2' }, ...]

    // Verificar si el nombre de usuario ya existe
    const userExists = allUsers.some(u => u.username === user); // Comprobar si el usuario ya existe en el array

    if (userExists) {
        // Si el usuario ya existe, crear un mensaje de error en la sesión
        req.session.error = 'The username is already in use. Please choose another one.';
        return res.redirect('/register'); // Redirigir al formulario de registro con el mensaje de error
    }

    // Si no existe, continuar con el siguiente middleware o controlador
    next();
}

module.exports = checkDuplicateUser; // Exportar el middleware para usarlo en las rutas