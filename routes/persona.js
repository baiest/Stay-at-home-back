var express = require('express');
var router = express.Router();
const { Persona } = require('../models');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'senmailerwww@gmail.com',
        pass: 'enviador123'
    }
});

router.get('/logout', async(req, res) => {
    req.header = null
    return res.json({
        session: false,
        msj: "sesion cerrada"
    })
});
router.post('/login', async(req, res) => {
    const { email, pass } = req.body;
    const person = await Persona.findOne({
        where: {
            email
        }
    });

    if (person) {
        if (person.pass == pass) {
            const token = jwt.sign({ user_id: person.email }, 'secret')
            req.header.token = token
            req.header.tipo = person.tipo
            res.json({ "msg": 'Sesion iniciada', "token": token })
        } else {
            res.json({ "msg": "Datos incorrectos", err: 'pass' })
        }
    } else {
        res.json({ "msg": "Usuario no encontrado", err: 'email' });
    }
});

router.post('/forgotpass', async(req, res) => {

    const person = await Persona.findAll({
        where: {
            email: req.body.email
        }
    })
    if (person.length > 0) {
        var mailOptions = {
            from: 'senmailerwww@gmail.com',
            to: req.body.email, // aquí se cambiaría por el correo del req.body.email osea- to: req.body.email - para enviar el correo a otra persona 
            subject: 'Prueba de correo enviado desde NodeJS',
            text: 'Ingresa a este enlace para actualizar tu contraseña https://localhost:3000/recoverPass'
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Email Sent:' + info.response);
            }
        });
        res.json({ "msg": "Correo Enviado" });

    } else {
        res.json({ "msg": "Datos correctos" });
    }
});

router.patch('/recoverpass', async(req, res) => {
    const { email, pass } = req.body;
    const person = await Persona.findAll({
        where: {
            email
        }
    })

    if (person.length > 0) {
        person.forEach(async person => {
            await person.update({
                pass
            });
        });

        res.json({ "msg": "Se cambió exitosamente la contraseña" });
    } else {
        res.json({ "msg": "No se cambió la contraseña" });
    }
});

module.exports = router;
