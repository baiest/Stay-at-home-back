var express = require('express');
var router = express.Router();
const { Persona, Paciente, Informe } = require('../models')

router.get('/get', async(req, res) => {
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

router.post('/register', async(req, res) => {
    const respuesta = {
        agregado: false,
        msg: 'Ya existe ese paciente'
    }
    var nuevaP = await Persona.findAll({
            where: {
                email: req.body.email
            }
        })
        .catch(err => console.log(err));
    if (nuevaP.length == 0) {

        nuevaP = await Persona.create({
                cedula: req.body.cedula,
                nombres: req.body.nombres,
                apellidos: req.body.apellidos,
                email: req.body.email,
                pass: req.body.pass,
                tipo: 'P'
            })
            .catch(err => console.log(err));
        const nuevoIn = await Informe.create({
                idInforme: 15,
                texto: 'Prueba Registro paciente'
            })
            .catch(err => console.log(err));
        console.log("Entre")
        await Paciente.create({
                cedulaP: nuevaP.cedula,
                edad: req.body.edad,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                doctor: 1,
                informeP: nuevoIn.idInforme
            })
            .then(res => console.log("Agregado"))
            .catch(err => console.log(err));

        respuesta.agregado = true;
        respuesta.msg = "Agregado exitosamente";
    }

    res.send(respuesta)
});

module.exports = router;