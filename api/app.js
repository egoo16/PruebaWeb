// requires
var express = require('express');


// Inicializar variables
var app = express();

// Routes

app.get('/', (req, res, next) => {
    res.status(200).json({
        status: true,
        message: 'Petición realizada correctamente'
    });
});


// Escucha de Peticiones
app.listen(3000, () => {
    console.log('Express server corriendo en puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});
