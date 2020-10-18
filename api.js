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

const session_middleware = express.Router();

session_middleware.use((req, res, next) => {
    const token = req.header.token;
    const tipo = req.header.tipo
    if (token) {
        if (tipo === 'D') {
            next();
        } else {
            res.json({
                auth: false,
                msj: 'No autorizado'
            });
        }
    } else {
        res.json({
            session: false,
            msj: 'Inicie sesion antes'
        });
    }
    console.log(tipo)
});

//RUTAS
app.use('/paciente', session_middleware)
app.use('/paciente', funPaciente);
app.use('/', login);
app.use('/persona', session_middleware);
app.use('/persona', login);
app.use('/', info);
app.listen(PORT, () => console.log('Servidor iniciado en el puerto %d', PORT));