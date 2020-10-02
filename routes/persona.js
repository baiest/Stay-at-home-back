var express = require('express');
var router = express.Router();
const { Persona } = require('../models')

router.post('/login', async(req, res) => {
    const { email, pass } = req.body;

    const person = await Persona.findAll({
        where: {
            email,
            pass
        }
    })
    if (person.length > 0) {
        res.json({ "msg": "Datos correctos" });
    } else {
        res.json({ "msg": "Datos correctos" });
    }

});

module.exports = router;