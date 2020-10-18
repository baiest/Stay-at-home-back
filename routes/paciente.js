var express = require('express');
var router = express.Router();
const { Persona, Paciente, Informe } = require('../models')

router.post('/get', async(req, res) => {
    await Paciente.findAll({
            where: {
                doctor: req.body.cedula
            },
            include: [{
                    model: Persona,
                    as: 'persona',
                    attributes: { exclude: ['pass', 'cedula'] }
                },
                {
                    model: Informe,
                    as: 'informe',
                    attributes: { exclude: ['idInforme'] }
                }
            ]
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
            .catch(err => {
                respuesta.msg = "Un capo vacio"
                console.log(err)
                res.send(respuesta)
            });

        const nuevoIn = await Informe.create({
                texto: 'Prueba Registro paciente'
            })
            .catch(err => console.log(err));

        await Paciente.create({
                cedulaP: nuevaP.cedula,
                fecha_nacimiento: req.body.fecha_nacimiento,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                doctor: req.body.doctor,
                informeP: nuevoIn.idInforme
            })
            .then(res => console.log("Agregado"))
            .catch(err => {
                respuesta.msg = "Un capo vacio"
                console.log(err)
                res.send(respuesta)
            });

        respuesta.agregado = true;
        respuesta.msg = "Agregado exitosamente";
    }

    res.send(respuesta)
});

module.exports = router;