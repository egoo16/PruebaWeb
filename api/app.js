// requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//CORS 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, X-Key, X-Route, X-Signature');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

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
