const express = require('express');
const router = express.Router();
const users = require('../users');
const checkDuplicateUser = require('../middlewares/checkDuplicateUser'); // Importar el middleware


router.get('/', function(req, res, next) {
    res.render('register', {title: 'Register', user: req.session.user});
});

router.post('/', checkDuplicateUser, async (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    try {
        await users.register(user, pass);
        req.session.user = {username: user};
        req.session.message = "¡Registro exitoso!"
        res.redirect("/restricted");
    } catch (error) {
        req.session.error = error.message;
        res.redirect("/register");
    }
});

module.exports = router;