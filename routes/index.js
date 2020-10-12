var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json({
        paciente: {
            get: '/paciente/get',
            registrar: '/register'
        },
        login: '/login'
    });
});

router.get('/session', async(req, res) => {
    res.json({ user: req.header.user })
});

module.exports = router