var express = require('express');
var router = express.Router();
const { Persona, Paciente, Informe } = require('../models')

router.get('/paciente', async(req, res) => {
    await Paciente.findAll({
            include: [{
                model: Persona,
                as: 'persona'
            }, {
                model: Persona,
                as: 'doctorP'
            }, {
                model: Informe,
                as: 'informe'
            }]
        })
        .then(result => {
            res.send(result);
        })
        .catch(err => console.log(err));
});

module.exports = router;