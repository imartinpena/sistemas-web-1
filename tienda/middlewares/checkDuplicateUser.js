const users = require('../users'); // Importar la lógica de usuarios

function checkDuplicateUser(req, res, next) {
    const { user } = req.body; // Cambiar a user para que coincida con el formulario

    // Obtener todos los usuarios existentes y verificar si el nombre de usuario ya está en uso
    const allUsers = users.getAllUsers(); // Devuelve un array de objetos [{ username: 'user1' }, { username: 'user2' }, ...]
    const userExists = allUsers.some(u => u.username === user);

    if (userExists) {
        // Si el usuario ya existe, enviar un mensaje de error
        req.session.error = 'The username is already in use. Please choose another one.';
        return res.redirect('/register'); // Redirigir al formulario de registro con un mensaje de error
    }

    // Si no existe, continuar con el siguiente middleware o controlador
    next();
}

module.exports = checkDuplicateUser;