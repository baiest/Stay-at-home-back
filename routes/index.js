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
    const person = await Persona.findOne({
        where: {
            email: jwt_decode(req.body.token).user_id
        }
    });
    res.json({ user: person })
});

module.exports = router