const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const path = require('path');

const empresas = require('./routes/api/empresas');
const campanas = require('./routes/api/campanas');
const participantes = require('./routes/api/participantes');
const cuentas = require('./routes/api/cuentas');
const solicitudes = require('./routes/api/solicitudes');
const challenges = require('./routes/api/challenges');
const tips = require('./routes/api/tips');
const recomendaciones = require('./routes/api/recomendaciones');

const app = express();

//Bodyparser Midddleware
app.use(bodyParser.json());

//Configuracion de la base de datos
const db = require('./config/keys'). mongoURI; //URl de MONGOLAB

//Conexion a mongo
mongoose
	.connect(db)
	.then(() => console.log('Conectado a MongoDB...'))
	.catch(err => console.log(err));

//Use routes
app.use('/api/empresas', empresas);
app.use('/api/campanas', campanas);
app.use('/api/participantes', participantes);
app.use('/api/cuentas', cuentas);
app.use('/api/solicitudes', solicitudes);
app.use('/api/challenges', challenges);
app.use('/api/tips', tips);
app.use('/api/recomendaciones', recomendaciones);

//Static files

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));