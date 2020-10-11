/*
CREAR EL SERVIDOR QUE CONTENDRA LA API QUE 
SE CONECTA CON LA BASE DE DATOS
*/
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const { Persona, Paciente, Informe } = require('./models')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors()); //Configurar quienes tienen permiso para usar el api
app.set('port', PORT);

const funPaciente = require('./routes/paciente.js');
const login = require('./routes/persona.js');
const info = require('./routes/index.js');

const session_middleware_doctor = require('./middlewares/sessionD.js');
const session_middleware_paciente = require('./middlewares/sessionD.js');

//RUTAS
app.use('/paciente', session_middleware_paciente)
app.use('/paciente', funPaciente);
app.use('/', login);
app.use('/persona', session_middleware_doctor);
app.use('/persona', login);
app.use('/', info);
app.listen(PORT, () => console.log('Servidor iniciado en el puerto %d', PORT));