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

module.exports = router