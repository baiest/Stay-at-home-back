var express = require('express');
var router = express.Router();
const { Persona } = require('../models');

router.post('/login', async(req, res) => {
    const { email, pass } = req.body;

    const person = await Persona.findOne({
        where: {
            email,
            pass
        }
    });

    if (person) {
        req.session.user_id = person.email
        res.json({ "msg": 'Sesion iniciada' })
    } else {
        res.json({ "msg": "Datos incorrectos" });
    }

});

module.exports = router;