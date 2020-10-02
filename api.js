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

const { Persona, Paciente, Informe } = require('./models')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors()); //Configurar quienes tienen permiso para usar el api
app.use(bodyParser.json());
app.set('port', PORT);

const getPaciente = require('./routes/paciente.js');
const register = require('./routes/paciente.js');
const login = require('./routes/index.js');

//RUTAS
app.use('/paciente', getPaciente);
app.use('/paciente', register);
app.use('/', login);


app.listen(PORT, () => console.log('Servidor iniciado en el puerto %d', PORT));