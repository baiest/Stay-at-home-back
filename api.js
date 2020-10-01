/*
CREAR EL SERVIDOR QUE CONTENDRA LA API QUE 
SE CONECTA CON LA BASE DE DATOS
*/
const express = require('express');
const cors = require('cors')
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 3000;

const { Persona } = require('./models')

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

app.listen(PORT, () => console.log('Servidor iniciado en el puerto %d', PORT));