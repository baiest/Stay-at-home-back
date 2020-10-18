const jwt_decode = require("jwt-decode");

var express = require('express');
var router = express.Router();
const { Persona } = require('../models');

router.get('/', (req, res) => {
    res.json({
        paciente: {
            get: '/paciente/get',
            registrar: '/register'
        },
        login: '/login'
    });
});

router.post('/session', async(req, res) => {
    try {
        const decode = jwt_decode(req.body.token).user_id
        const person = await Persona.findOne({
            where: {
                email: decode
            }
        });
        req.header.token = person ? req.body.token : '';
        req.header.tipo = person ? person.tipo : '';
        res.json({ user: person });
    } catch (e) {
        console.log(e)
        res.json({ session: false, msj: 'No hay session' })
    }
});

module.exports = router