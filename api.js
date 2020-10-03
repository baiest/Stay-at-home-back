/*
CREAR EL SERVIDOR QUE CONTENDRA LA API QUE 
SE CONECTA CON LA BASE DE DATOS
*/
const express = require('express');
const cors = require('cors')
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const PORT = process.env.PORT || 3000;

const { Persona, Paciente, Informe } = require('./models')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors()); //Configurar quienes tienen permiso para usar el api
app.use(bodyParser.json());
app.set('port', PORT);


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}

const funPaciente = require('./routes/paciente.js');
const login = require('./routes/persona.js');
const info = require('./routes/index.js');

const session_middleware = require('./middlewares/session.js');

//RUTAS
app.use('/paciente', session_middleware)
app.use('/paciente', funPaciente);
app.use('/', login);
app.use('/', info);
app.listen(PORT, () => console.log('Servidor iniciado en el puerto %d', PORT));