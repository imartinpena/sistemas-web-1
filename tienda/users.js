const bcrypt = require("bcrypt");

const users = {};

// Función para comparar contraseñas
users.comparePass = function(pass, hash, callback) {
    bcrypt.compare(pass, hash, callback);
};

// Función para generar un hash de contraseña
users.generateHash = function(pass, callback) {
    bcrypt.hash(pass, 10, callback);
};

// Función para obtener todos los usuarios
users.getAllUsers = function() {
    // Filtrar solo las propiedades que son objetos de usuarios
    return Object.keys(users)
        .filter(key => typeof users[key] === 'object' && users[key].username)
        .map(key => ({
            username: key,
            hash: users[key].hash
        }));
};

// Función para registrar un nuevo usuario
users.register = function(username, pass, callback) {
    users.generateHash(pass, function(err, hash) {
        if (err) {
            console.error("Error generating hash:", err);
            return;
        }
        users[username] = { username, hash };
        if (callback) {
            callback();
        }
    });
};

// Función para eliminar un usuario
users.deleteUser = function(username) {
    if (users[username]) {
        delete users[username];
        return true; // Indica que la eliminación fue exitosa
    }
    return false; // Indica que el usuario no existía
};

// Registrar automáticamente 2 usuarios, cuando arrancamos la app (admin y user)
users.register('admin', 'admin', function() {
    console.log('User admin successfully registered');
});

users.register('user', 'user', function() {
    console.log('User user successfully registered');
});

module.exports = users;