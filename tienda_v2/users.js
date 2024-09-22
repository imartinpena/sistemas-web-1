const bcrypt = require("bcrypt"); // Importamos bcrypt para manejar el hashing de contraseñas

const users = {}; // Objeto donde se almacenarán los usuarios registrados

// Función para comparar una contraseña con su hash almacenado
users.comparePass = function(pass, hash, callback) {
    bcrypt.compare(pass, hash, callback); // Compara la contraseña ingresada con el hash almacenado
};

// Función para generar un hash a partir de una contraseña
users.generateHash = function(pass, callback) {
    bcrypt.hash(pass, 10, callback); // Genera un hash con un "salting" de 10 rondas
};

// Función para obtener todos los usuarios registrados (evita devolver funciones o valores erróneos)
users.getAllUsers = function() {
    return Object.keys(users) // Obtiene las claves del objeto `users`
        .filter(key => typeof users[key] === 'object' && users[key].username) // Filtra para obtener solo los objetos que tienen un nombre de usuario
        .map(key => ({
            username: key, // Devuelve el nombre de usuario
            hash: users[key].hash // Devuelve el hash de la contraseña (sin mostrarla)
        }));
};

// Función para registrar un nuevo usuario en el sistema
users.register = function(username, pass, callback) {
    users.generateHash(pass, function(err, hash) { // Genera el hash de la contraseña proporcionada
        if (err) {
            console.error("Error generating hash:", err); // Muestra el error si ocurre
            return;
        }
        users[username] = { 
            username, // Almacena el nombre de usuario
            hash, // Almacena el hash de la contraseña
            acceptedCookies: false // Inicia el valor de las cookies en false
        };
        if (callback) {
            callback(); // Llama al callback si se proporciona
        }
    });
};

// Función para eliminar un usuario del sistema
users.deleteUser = function(username) {
    if (users[username]) { // Si el usuario existe
        delete users[username]; // Elimina el usuario
        return true; // Indica que se eliminó correctamente
    }
    return false; // Indica que el usuario no existía
};

// Registro automático de 2 usuarios por defecto: admin y user
users.register('admin', 'admin', function() {
    console.log('User admin successfully registered');
});

users.register('user', 'user', function() {
    console.log('User user successfully registered');
});

module.exports = users; // Exporta el objeto `users` para su uso en otros módulos