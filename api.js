/*
CREAR EL SERVIDOR QUE CONTENDRA LA API QUE 
SE CONECTA CON LA BASE DE DATOS
*/

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const { Persona, Paciente, Informe } = require('./models')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors()); //Configurar quienes tienen permiso para usar el api
app.set('port', PORT);

const funPaciente = require('./routes/paciente.js');
const login = require('./routes/persona.js');
const info = require('./routes/index.js');
const chat = require('./routes/chat.js');
const { listen } = require('socket.io');

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
app.use('/', chat);




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var server = app.listen(PORT, () => console.log('Servidor iniciado en el puerto %d', PORT));
const socketio = require('socket.io');
const io = socketio.listen(server);

// SOCKETS
io.on('connection', (socket) => {
    console.log('we have a new connection');

    socket.on('disconnected', () => {
        console.log('user had left');
    });
});