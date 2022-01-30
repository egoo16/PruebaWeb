var express = require('express');

var app = express();

app.get('/', (req, res, next) => {
    res.status(200).json({
        status: true,
        message: 'Petición realizada correctamente'
    });
});


module.exports = app;