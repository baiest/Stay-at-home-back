/*
CREAR EL SERVIDOR QUE CONTENDRA LA API QUE 
SE CONECTA CON LA BASE DE DATOS
*/
const express = require('express');
const cors = require('cors')
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const { Persona } = require('./models')

app.use(cors()); //Configurar quienes tienen permiso para usar el api
app.use(bodyParser.json());
app.set('port', PORT);

//PEDIR LAS PACIENTES EN LA BD
app.get('/', async(req, res) => {
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
})

app.post('/login', async(req, res) => {
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

})

app.listen(PORT, () => console.log('Servidor iniciado en el puerto %d', PORT));