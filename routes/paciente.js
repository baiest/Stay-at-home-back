var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;
const { Persona, Paciente, Informe } = require('../models')

//Obtener informes
router.post('/informe/get', async(req, res) => {
    let informes = await Informe.findAll({
        where: {
            idInforme: req.body.cedula
        }
    });
    res.send(informes)
});

//Crear informe de pacientes
router.post('/informe/registrar', async(req, res) => {
    respuesta = { agregado: true, msj: "Ingresado" };
    await Informe.create({
        idInforme: req.body.cedulaP,
        texto: req.body.texto
    }).catch(err => {
        respuesta.agregado = false;
        respuesta.msj = "Algo salio mal"
        console.log("Algo salio mal", err)
    });

    res.send(respuesta)
});
router.post('/get', async(req, res) => {
    await Paciente.findAll({
            where: {
                doctor: req.body.cedula
            },
            include: [{
                model: Persona,
                as: 'persona',
                attributes: { exclude: ['pass', 'cedula'] }
            }]
        })
        .then(result => {
            res.json(result);
        })
        .catch(err => console.log(err));
});

/*Cambiar atributo isActiv ded paciente*/
router.put('/active/:id', async(req, res) => {
    const respuesta = {
        update: true,
        msg: 'Paciente actualizado'
    }
    let paciente = await Paciente.findOne({
            where: { cedulaP: req.params.id }
        })
        .catch(() => {
            respuesta.update = false;
            respuesta.msg = 'Paciente no encontrado'
        });
    if (respuesta.update) {
        await paciente.update({
                isActive: paciente.isActive ? false : true
            }, {
                where: {
                    cedulaP: req.params.id
                }
            })
            .catch(() => {
                respuesta.update = false;
                respuesta.msg = 'Paciente no encontrado'
            });
    }
    respuesta.isActive = paciente.isActive
    res.send(respuesta)
});
router.post('/register', async(req, res) => {
    var respuesta = {
        agregado: false,
        msg: 'Ya existe ese paciente'
    }
    var nuevaP = await Persona.findAll({
            where: {
                email: req.body.email
            }
        })
        .catch(err => console.log(err));
    //console.log(nuevaP)
    if (nuevaP.length === 0) {

        bcrypt.hash(req.body.pass, BCRYPT_SALT_ROUNDS)
            .then(async passHash => {
                nuevaP = await Persona.create({
                        cedula: req.body.cedula,
                        nombres: req.body.nombres,
                        apellidos: req.body.apellidos,
                        email: req.body.email,
                        pass: passHash,
                        tipo: 'P'
                    })
                    .catch(err => {
                        respuesta.msg = "Un capo vacio"
                        console.log(err)
                    });

                await Paciente.create({
                        cedulaP: nuevaP.cedula,
                        fecha_nacimiento: req.body.fecha_nacimiento,
                        direccion: req.body.direccion,
                        telefono: req.body.telefono,
                        doctor: req.body.doctor,
                        //informeP: nuevoIn.idInforme,
                        isActive: true
                    })
                    .then(res => {
                        console.log("Agregado")
                    })
                    .catch(err => {
                        respuesta.msg = "Un capo vacio"
                        nuevaP.destroy()
                        console.log(err)
                        res.send(respuesta)
                    });

            });
    }
    respuesta.agregado = true;
    respuesta.msg = "Agregado exitosamente";
    res.send(respuesta)
});

module.exports = router;