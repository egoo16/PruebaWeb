var express = require("express");
var app = express();

const LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./storage");
localStorage.setItem("credentials", "[]");

app.put("/", (req, res, next) => {
  var key  = req.body.key;
  var shared_secret = req.body.shared_secret;

  if (key && shared_secret) {
    let credentials = JSON.parse(localStorage.getItem("credentials"));

    // Verify token exists
    if (credentials.find((e) => e.key == key)) {
      res.status(403).json({
        status: false,
        message: "Credenciales ya existen",
      });
    } else {
      var aux = { key: key, shared_secret: shared_secret };
      credentials.push(aux);
      localStorage.setItem("credentials", JSON.stringify(credentials));
      res.status(204).json({
        status: true,
        message: "Credenciales Registradas",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      message: "Ocurrio un error",
    });
  }
});

module.exports = app;
