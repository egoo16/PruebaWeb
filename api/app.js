// requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Settings to BodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Importacion de Rutas
var appRoutes = require('./routes/app');
var credentialRoutes = require('./routes/credential');
var messageRoutes = require('./routes/message');

// Routes
app.use('/message',messageRoutes);
app.use('/credential',credentialRoutes);
app.use('/',appRoutes);


// Escucha de Peticiones
app.listen(3000, () => {
    console.log('Express server corriendo en puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});
