/*
CREAR EL SERVIDOR QUE CONTENDRA LA API QUE 
SE CONECTA CON LA BASE DE DATOS
*/
const express = require('express');
const cors = require('cors')
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser')

const { Persona, Paciente, Informe } = require('./models')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors()); //Configurar quienes tienen permiso para usar el api
app.set('port', PORT);

//PEDIR LAS PERSONAS EN LA BD
app.get('/', async(req, res) => {
    await Persona.findAll()
        .then(result => {
            res.send(result);
        })
        .catch(err => console.log(err));
})
 //AGREGAR PACIENTE A LA BD
app.post('/paciente', async(req, res) => {
    const respuesta = {
        agregado: false,
        msg: 'Ya existe ese paciente'
    }
    console.log(req.body)
    console.log(req.body)
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
        });
        const nuevoIn = await Informe.create({
                idInforme: 15,
                texto: 'Prueba Registro paciente'
            })
            .catch(err => console.log(err));
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
})

app.listen(PORT, () => console.log('Servidor iniciado en el puerto %d', PORT));