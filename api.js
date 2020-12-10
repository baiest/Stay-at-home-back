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
});



//RUTAS
app.use('/paciente', session_middleware)
app.use('/paciente', funPaciente);
app.use('/', login);
app.use('/persona', session_middleware);
app.use('/persona', login);
app.use('/', info);
app.use('/', chat);

var server = app.listen(PORT, () => console.log('Servidor iniciado en el puerto %d', PORT));
const socketio = require('socket.io');
const io = socketio.listen(server);
const { addUser, removeUser, getUser, getUserInRoom, getUsersInRoom } = require('./users.js');

// SOCKETS
try {

    io.on('connection', (socket) => {
        socket.emit('connection', "Alguien conectado")
        socket.on('ping', (data) => {
            socket.emit('newLocation', data);
          });
        socket.on('join', ({ name, room }, callback) => {
            const { error, user } = addUser({ id: socket.id, name, room });
            if (error) return callback(error);
            socket.emit('message', { user: 'admin', text: `${user.name}, ha entrado a la sala` });
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: ` ${user.name}, se unió ` });
            socket.join(user.room);
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
            callback();
        });

        socket.on('sendMessage', (message, callback) => {
            const { error, user } = getUser(socket.id);
            if (error) return callback(error);
            io.to(user.room).emit('message', { user: user.name, text: message });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
            callback();
        });

        socket.on('disconnected', () => {
            const user = removeUser(socket.id);
            if (user) {
                io.to(user.room).emit('message', { user: 'admin', text: `${user.name} ha dejado la sala` })
            }
        });
    });
} catch (e) {
    console.log('HUBO UN ERROR EN LA CONEXION')
    console.log(e)
}